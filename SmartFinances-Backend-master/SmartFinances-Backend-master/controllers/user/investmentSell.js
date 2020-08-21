const usersWalletBalance = require("../../models/balance");
const userInvestments = require("../../models/investment");

exports.InvestmentSell = async (req, res) => {
  const userAccountNumber = req.body.accountNumber;
  const uinvestmentType = req.body.investmentType;
  const investedCompanyName = req.body.companyName;
  const numberOfUnits = req.body.numberOfUnits;
  var query = {
    accountNumber: userAccountNumber,
    investmentType: uinvestmentType,
    companyName: investedCompanyName,
  };
  let user = await userInvestments.findOne(query).exec();
  if (numberOfUnits > user.numberOfUnits) {
    return res.status(400).json({
      error: "Number of units entered is greater than available units",
    });
  } else if (!user) {
    return res.status(400).json({
      error: "Not able to find the user Information",
    });
  } else {
    var calculateAmount = parseInt(numberOfUnits) * parseInt(user.pricePerUnit);
    const updatedNumberOfUnits = user.numberOfUnits - numberOfUnits;
    const amountInvested = user.amountInvested - calculateAmount;
    await userInvestments
      .updateOne(query, {
        numberOfUnits: updatedNumberOfUnits,
        amountInvested: amountInvested,
      })
      .exec((err, userinvestment) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json(userinvestment);
      });
  }

  await usersWalletBalance
    .findOne({
      accountNumber: userAccountNumber,
    })
    .exec(async (err, updateBalance) => {
      if (err || !updateBalance) {
        res.status(400).json({
          error: "Not able to update the balance of user",
        });
      }

      updateBalance.walletAccountBalance =
        parseInt(updateBalance.walletAccountBalance) +
        parseInt(calculateAmount);
      console.log(updateBalance[uinvestmentType]);
      updateBalance[uinvestmentType] =
        parseInt(updateBalance[uinvestmentType]) - parseInt(calculateAmount);
      updateBalance.totalfunds =
        parseInt(updateBalance.totalfunds) - parseInt(calculateAmount);
      await updateBalance.save();
    });
};
