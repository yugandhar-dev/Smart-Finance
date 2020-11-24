const investmentOptions = require("../../models/investmentOptions");
const userBalance = require("../../models/balance");
const userInvestments = require("../../models/userInvestments");
const newTransaction = require("../../models/newTransaction");

exports.InvestmentFunds = async (req, res) => {
  const investment = new userInvestments(req.body);
  const now = new Date();
  let investmentDetails;
  let userBalances;
  let calculateAmount;

  if (
    investment.investmentType == "lowRiskFund" ||
    investment.investmentType == "exchangeTradedFund" ||
    investment.investmentType == "savingScheme"
  ) {
    try {
      investmentDetails = await investmentOptions
        .findOne({
          companyName: investment.companyName,
          investmentType: investment.investmentType,
        })
        .exec();
    } catch (err) {
      return res.status(400).json({
        error: "Error fetching user details",
      });
    }

    if (!investmentDetails) {
      return res.status(400).json({
        error:
          "No Investment options found with the provided company name and investment type",
      });
    }
    calculateAmount =
      parseFloat(investmentDetails.pricePerUnit).toFixed(2) *
      parseInt(investment.numberOfUnits);

    try {
      userBalances = await userBalance
        .findOne({ walletAccountNumber: investment.walletAccountNumber })
        .exec();
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }

    if (!userBalances) {
      return res.status(400).json({
        error: "Error fetching user Balances",
      });
    } else if (userBalances.walletAccountBalance < calculateAmount) {
      return res.status(400).json({
        error: "Balance is less than the Investment Amount",
      });
    }
    userBalances.walletAccountBalance = (
      userBalances.walletAccountBalance - calculateAmount
    ).toFixed(2);
    userBalances[investment.investmentType] = (
      userBalances[investment.investmentType] + calculateAmount
    ).toFixed(2);
    userBalances.totalfunds = (
      userBalances.totalfunds + calculateAmount
    ).toFixed(2);
    try {
      await userBalances.save();
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }

    const userInvests = await userInvestments.findOne({
      walletAccountNumber: investment.walletAccountNumber,
      investmentType: investment.investmentType,
      companyName: investment.companyName,
    });

    if (!userInvests) {
      const userInvest = new userInvestments({
        accountNumber: investment.accountNumber,
        walletAccountNumber: investment.walletAccountNumber,
        investmentType: investment.investmentType,
        companyName: investment.companyName,
        numberOfUnits: investment.numberOfUnits,
        amountInvested: parseFloat(calculateAmount).toFixed(2),
        pricePerUnit: investmentDetails.pricePerUnit,
        createdDate: now,
      });
      await userInvest.save();
    } else {
      await userInvestments.findOneAndUpdate(
        {
          walletAccountNumber: investment.walletAccountNumber,
          investmentType: investment.investmentType,
          companyName: investment.companyName,
        },
        {
          $inc: {
            numberOfUnits: investment.numberOfUnits,
            amountInvested: calculateAmount.toFixed(2),
          },
        }
      );
    }

    res.status(200).json({
      Success: "Amount Invested and updated Balances",
    });
  } else {
    return res.status(400).json({
      error: "Given Investment Type is not in the list",
    });
  }

  const transaction = {
    walletAccountNumber: investment.walletAccountNumber,
    category: "Investments",
    subcategory: "invested in " + investment.investmentType,
    amount: calculateAmount.toFixed(2),
    date: new Date(),
  };

  const saveTransaction = new newTransaction(transaction);

  try {
    //Save transaction to new Transactions collection
    await saveTransaction.save();
  } catch (error) {
    return res.status(400).json({
      error: "Unable to save transaction",
    });
  }
};

  
