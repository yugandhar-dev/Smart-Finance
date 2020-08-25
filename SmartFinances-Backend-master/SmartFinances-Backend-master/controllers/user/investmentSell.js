const usersWalletBalance = require('../../models/balance');
const userInvestments = require('../../models/userInvestments');
const investmentOptions = require('../../models/investmentOptions');
exports.InvestmentSell = async (req, res) => {
<<<<<<< HEAD
  let calculateAmount;
  let amountInvested;
  let updatedNumberOfUnits;
  // Query for retrieving user information from all tables according to the request
  const query = {
=======
  let investmentDetails;
  let user;
  let calculateAmount;
  let amountInvested;
  let updatedNumberOfUnits;
  
  //Query for retrieving user information from all tables according to the request
  var query = {
>>>>>>> 719f79a... feat: changed the code according to review comments
    walletAccountNumber: req.body.walletAccountNumber,
    investmentType: req.body.investmentType,
    companyName: req.body.companyName,
  };
<<<<<<< HEAD
  // Finding user current investments
  const user = await userInvestments.findOne(query).exec().catch(() => null);
  
  // Validations for retrieval of user investment details
  if (!user) {
=======
  
  //Function to update user investments after selling
  const updateInvestmentDetails = async(updatedNumberOfUnits,amountInvested) => {
    await userInvestments
    .updateOne(query, {
      numberOfUnits: updatedNumberOfUnits,
      amountInvested: parseFloat(amountInvested).toFixed(2),
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
  //Finding user current investments
  try {
    user = await userInvestments.findOne(query).exec();
  } catch (err) {
>>>>>>> 719f79a... feat: changed the code according to review comments
    return res.status(400).json({
      error: 'Not able to find the user Information',
    });
<<<<<<< HEAD
  } else if (req.body.numberOfUnits > user.numberOfUnits) {
=======
  }

    //Validations for retrieval of user investment details
  if (!user) {
>>>>>>> 719f79a... feat: changed the code according to review comments
    return res.status(400).json({
      error: 'Number of units entered is greater than available units',
    });
<<<<<<< HEAD
  }
  // Finding current price per unit from investment option details collection
  const investmentDetails = await investmentOptions.findOne({
    investmentType: req.body.investmentType,
    companyName: req.body.companyName,
  }).exec().catch(() => null);
  if (!investmentDetails) {
=======
  } else if (req.body.numberOfUnits > user.numberOfUnits) {
>>>>>>> 719f79a... feat: changed the code according to review comments
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
<<<<<<< HEAD
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
=======
    //Finding current price per unit from investment option details collection 
    try {
      investmentDetails = await investmentOptions.findOne({investmentType: req.body.investmentType,companyName: req.body.companyName}).exec();
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (!investmentDetails) {
      return res.status(400).json({
        error: "Not able to fetch Investment options details",
      });
    }else if(user.investmentType == "savingScheme"){
      var percentageAmount = (parseFloat(investmentDetails.percentageOfReturns).toFixed(2) *parseFloat(investmentDetails.pricePerUnit).toFixed(2) )/100;
      calculateAmount = percentageAmount + investmentDetails.pricePerUnit;
      amountInvested = parseFloat(user.amountInvested).toFixed(2) - calculateAmount;
      console.log(amountInvested);
      updatedNumberOfUnits = user.numberOfUnits - 1;
      await updateInvestmentDetails(updatedNumberOfUnits,amountInvested);
    }else{
      calculateAmount = parseInt(req.body.numberOfUnits) * parseFloat(investmentDetails.pricePerUnit).toFixed(2);
     updatedNumberOfUnits = user.numberOfUnits - req.body.numberOfUnits;
     amountInvested = user.amountInvested - calculateAmount;
     updateInvestmentDetails(updatedNumberOfUnits,amountInvested);
    }
  }

  //Finding balances of user using wallet account number from balances table
  usersWalletBalance
    .findOne({
      walletAccountNumber: req.body.walletAccountNumber,
    })
    .exec(async (err, updateBalance) => {
      if (err || !updateBalance) {
        res.status(400).json({
          error: "Not able to fetch the details of user balances",
        });
      }

      updateBalance.walletAccountBalance =
        updateBalance.walletAccountBalance + calculateAmount;

      updateBalance[req.body.investmentType] =
        parseFloat(updateBalance[req.body.investmentType]).toFixed(2) -
        parseFloat(calculateAmount).toFixed(2);
      updateBalance.totalfunds =
        parseFloat(updateBalance.totalfunds).toFixed(2) - parseFloat(calculateAmount).toFixed(2);
      //Saving the updated balances of user in balances collection
        try{
        await updateBalance.save();
      }catch(err) {
        res.status(400).json({
          error: err,
        });
      }
        
>>>>>>> 719f79a... feat: changed the code according to review comments
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


