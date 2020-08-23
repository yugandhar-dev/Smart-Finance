const usersWalletBalance = require("../../models/balance");
const userInvestments = require("../../models/userInvestments");
const investmentOptions = require("../../models/investmentOptions");

exports.InvestmentSell = async (req, res) => {
  // const userDetails = new userInvestments(req.body);
  // const userDetails.userWalletAccountNumber = req.body.accountNumber;
  // const userDetails.userInvestmentType = req.body.investmentType;
  // const userDetails.companyName = req.body.companyName;
  // const numberOfUnits = req.body.numberOfUnits;
  let investmentDetails;
  var query = {
    walletAccountNumber: userDetails.userWalletAccountNumber,
    investmentType: userDetails.userInvestmentType,
    companyName: userDetails.companyName,
  };
  try{
    let user = await userInvestments.findOne(query).exec();
  }catch(err){
    return res.status(400).json({
      error: err,
    });
  }
  
  if (!user) {
    return res.status(400).json({
      error: "Not able to find the user Information",
    });
  }else if (userDetails.numberOfUnits > user.numberOfUnits) {
    return res.status(400).json({
      error: "Number of units entered is greater than available units",
    });
  } 
   else {
     try{
      investmentDetails = await investmentOptions.findOne().exec();
     }catch(err){
      return res.status(400).json({
        error: err,
      });
     }
     if(!investmentDetails){
      return res.status(400).json({
        error: "Not able to fetch Investment options details",
      });
     }  
    
    var calculateAmount = parseInt(userDetails.numberOfUnits) * parseInt(investmentDetails.pricePerUnit);
    const updatedNumberOfUnits = user.numberOfUnits - userDetails.numberOfUnits;
    const amountInvested = user.amountInvested - calculateAmount;

     userInvestments
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

   usersWalletBalance
    .findOne({
      accountNumber: userDetails.userWalletAccountNumber,
    })
    .exec(async (err, updateBalance) => {
      if (err || !updateBalance) {
        res.status(400).json({
          error: "Not able to update the balance of user",
        });
      }

      updateBalance.walletAccountBalance =
        updateBalance.walletAccountBalance +
        calculateAmount;
      
      updateBalance[userDetails.userInvestmentType] =
        parseInt(updateBalance[userDetails.userInvestmentType]) - parseInt(calculateAmount);
      updateBalance.totalfunds =
        parseInt(updateBalance.totalfunds) - parseInt(calculateAmount);
      await updateBalance.save();
    });
};
