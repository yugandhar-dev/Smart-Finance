const investmentOptions = require("../../models/investmentOptions");
const userBalance = require("../../models/balance");
const userInvestments = require("../../models/userInvestments");
<<<<<<< HEAD
const newTransaction = require("../../models/newTransaction");

exports.InvestmentFunds = async (req, res) => {
  const investment = new userInvestments(req.body);
  const now = new Date();
  let investmentDetails;
  let userBalances;
  let calculateAmount;
<<<<<<< HEAD
=======
  

  if (investment.investmentType=="lowRiskFund" || investment.investmentType=="exchangeTradedFund" || investment.investmentType=="savingScheme"){

    

=======
exports.InvestmentFunds = async (req, res) => {
  const investment = new userInvestments(req.body);
  //const walletAccountNumber = req.body.walletAccountNumber;
  //const numberOfUnits = req.body.numberOfUnits;
  //const savingSchemeAmount = req.body.savingSchemeAmount;
  let investmentDetails;
  let userBalances;
  let calculateAmount;
  if (investment.investmentType=="lowRiskFund" || investment.investmentType=="exchangeTradedFund" || investment.investmentType=="savingScheme"){

>>>>>>> 78dbb30... fix: rebasing to clear conflicts
  try {
    investmentDetails = await investmentOptions
      .findOne({
        companyName: investment.companyName,
        investmentType: investment.investmentType
      })
      .exec();
  } catch (err) {
    return res.status(400).json({
      error: "Error fetching user details"
    });
  }

  if (!investmentDetails) {
<<<<<<< HEAD
    return res.status(400).json({
      error: "No Investment options found with the provided company name and investment type"
    });
  }
    calculateAmount = parseFloat(investmentDetails.pricePerUnit).toFixed(2)*parseInt(investment.numberOfUnits);
  
>>>>>>> 8c0b353... fix: modified and fixed code according to comments

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

<<<<<<< HEAD
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
=======
=======
    await investment.save();
    res.json(investment);
  } else if (investment.investmentType != "savingScheme") {
    investmentDetails.pricePerUnit = investment.pricePerUnit;
    await investmentDetails.save();
  }

  try {
    userBalances = await userBalance
      .findOne({ walletAccountNumber: investment.walletAccountNumber })
      .exec();
  } catch (err) {
    
    return res.status(400).json({
        
      error: err
    });
  }

>>>>>>> 78dbb30... fix: rebasing to clear conflicts
  if (!userBalances) {
    return res.status(400).json({
      error: "Error fetching user Balances"
    });
<<<<<<< HEAD
  }else if(userBalances.walletAccountBalance < calculateAmount){
    return res.status(400).json({
      error: "Balance is less than the Investment Amount"
    });
  }
  userBalances.walletAccountBalance = userBalances.walletAccountBalance - calculateAmount;
  userBalances[investment.investmentType] = userBalances[investment.investmentType] + calculateAmount;
  userBalances.totalfunds = userBalances.totalfunds + calculateAmount;
  try{
    await userBalances.save();

  }catch(err){
    return res.status(400).json({
      error: err
    });
  }
  const saveInvestment = {
    accountNumber: investment.accountNumber,
    walletAccountNumber: investment.walletAccountNumber,
    investmentType: investment.investmentType,
    companyName: investment.companyName,
    numberOfUnits: investment.numberOfUnits,
    amountInvested: calculateAmount,
    pricePerUnit: investmentDetails.pricePerUnit,
    createdDate: now
  };
  const saveUserInvestment = new userInvestments(saveInvestment);
    try{
      await saveUserInvestment.save();
    }catch(err){
      return res.status(400).json({
        error: err
      });
    }
    
    res.status(200).json({
      Success: "Amount Invested and updated Balances"
    });
=======
  } else if (investment.investmentType != "savingScheme") {
    calculateAmount =
      parseFloat(investmentDetails.pricePerUnit) * parseInt(numberOfUnits);

    userBalances.walletAccountBalance =
      parseFloat(userBalances.walletAccountBalance) - calculateAmount;
    userBalances[investment.investmentType] =
      parseFloat(userBalances[investment.investmentType]) +
      calculateAmount;
    userBalances.totalfunds = parseFloat(userBalances.totalfunds) + calculateAmount;
    userBalances.save();
  } else {
    userBalances.walletAccountBalance =
      userBalances.walletAccountBalance - investment.pricePerUnit;
    userBalances[investment.investmentType] =
      userBalances[investment.investmentType] + investment.pricePerUnit;
    userBalances.totalfunds = userBalances.totalfunds + investment.pricePerUnit;
    await userBalances.save();
  }

  await userInvestments
    .findOne({
      walletAccountNumber: investment.walletAccountNumber,
      companyName: investment.companyName
    })
    .exec((err, investments) => {
      if (err) {
        
        return res.status(400).json({
            
          error: err
        });
      } else if (!investments && investment.investmentType != "savingScheme") {
        invest(
          false,
          parseInt(numberOfUnits),
          calculateAmount,
          investment.pricePerUnit
        );
      } else if (!investments && investment.investmentType == "savingScheme") {
        invest(false, 1, investment.pricePerUnit, investment.pricePerUnit);
      } else {
        invest(
          true,
          parseInt(investments.numberOfUnits) + parseInt(numberOfUnits),
          investments.amountInvested + calculateAmount,
          investment.pricePerUnit
        );
      }
    
    });

  const invest = async (check, numberOfUnits, amountInvested, pricePerUnit) => {
    const userinvest = {
      accountNumber: userBalances.accountNumber,
      walletAccountNumber: investment.walletAccountNumber,
      investmentType: investment.investmentType,
      companyName: investment.companyName,
      numberOfUnits: parseInt(numberOfUnits),
      amountInvested: parseFloat(amountInvested),
      pricePerUnit: investment.pricePerUnit
    };

    const saveUserInvestment = new userInvestments(userinvest);
    if (check) {
      userInvestments
        .updateOne(
          {
            walletAccountNumber: walletAccountNumber,
            companyName: investment.companyName
          },
          {
            amountInvested: amountInvested,
            numberOfUnits: numberOfUnits,
            pricePerUnit: pricePerUnit
          }
        )
        .exec();
    } else {
      await saveUserInvestment.save();
    }
  };

  res.json(userBalances);
>>>>>>> 78dbb30... fix: rebasing to clear conflicts
}
else{
  return res.status(400).json({
            
    error: "Given Investment Type is not in the list"
  });
}
<<<<<<< HEAD
>>>>>>> 8c0b353... fix: modified and fixed code according to comments
};

  
=======
};
>>>>>>> 78dbb30... fix: rebasing to clear conflicts
