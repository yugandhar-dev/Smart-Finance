const usersWalletBalance = require('../../models/balance');
const userInvestments = require('../../models/userInvestments');
const investmentOptions = require('../../models/investmentOptions');
exports.InvestmentSell = async (req, res) => {
  let calculateAmount;
  let amountInvested;
  let updatedNumberOfUnits;
  // Query for retrieving user information from all tables according to the request
  const query = {
    walletAccountNumber: req.body.walletAccountNumber,
    investmentType: req.body.investmentType,
    companyName: req.body.companyName,
  };
  // Finding user current investments
  const user = await userInvestments.findOne(query).exec().catch(() => null);
  
  // Validations for retrieval of user investment details
  if (!user) {
    return res.status(400).json({
      error: 'Not able to find the user Information',
    });
  } else if (req.body.numberOfUnits > user.numberOfUnits) {
    return res.status(400).json({
      error: 'Number of units entered is greater than available units',
    });
  }
  // Finding current price per unit from investment option details collection
  const investmentDetails = await investmentOptions.findOne({
    investmentType: req.body.investmentType,
    companyName: req.body.companyName,
  }).exec().catch(() => null);
  if (!investmentDetails) {
    return res.status(400).json({
      error: 'It was unable to find the investment details',
    });
  }
  if (user.investmentType === 'savingScheme') {
    const percentageAmount = (parseFloat(investmentDetails.percentageOfReturns).toFixed(2) * parseFloat(investmentDetails.pricePerUnit).toFixed(2)) / 100;
    calculateAmount = percentageAmount + investmentDetails.pricePerUnit;
    amountInvested = parseFloat(user.amountInvested).toFixed(2) - calculateAmount;
    updatedNumberOfUnits = user.numberOfUnits - 1;
  } else {
    calculateAmount = parseInt(req.body.numberOfUnits) * parseFloat(investmentDetails.pricePerUnit).toFixed(2);
    updatedNumberOfUnits = user.numberOfUnits - req.body.numberOfUnits;
    amountInvested = user.amountInvested - calculateAmount;
  }
  const userInvestment = await userInvestments.updateOne(
    query,
    {
      numberOfUnits: updatedNumberOfUnits,
      amountInvested: parseFloat(amountInvested).toFixed(2),
    },
  ).exec().catch(() => null);
  if (!userInvestment) {
    return res.status(400).json({
      error: 'It was unable to update the user investment',
    });
  }
  // Finding balances of user using wallet account number from balances table
  const userBalance = await usersWalletBalance.findOne({
    walletAccountNumber: req.body.walletAccountNumber,
  }).exec().catch(() => null);
  if (!userBalance) {
    res.status(400).json({
      error: 'Not able to fetch the details of user balances',
    });
  }
  userBalance.walletAccountBalance += calculateAmount;
  userBalance[req.body.investmentType] = parseFloat(userBalance[req.body.investmentType]).toFixed(2)
    - parseFloat(calculateAmount).toFixed(2);
  userBalance.totalfunds = parseFloat(userBalance.totalfunds).toFixed(2) - parseFloat(calculateAmount).toFixed(2);
  // Saving the updated balances of user in balances collection
  try {
    await userBalance.save();
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
  return res.json(userInvestment);
};


