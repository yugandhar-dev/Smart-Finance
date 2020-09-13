const usersWalletBalance = require('../../models/balance');
const newTransaction = require("../../models/newTransaction");

exports.InvestmentWithdraw = (req, res) => {
  const walletAmount = parseFloat(req.body.walletFund);
  const userAccountNumber = req.body.accountNumber;
  const userWalletAccountNumber = req.body.walletAccountNumber;
  const now = new Date();

  usersWalletBalance
    .findOne({
      accountNumber: userAccountNumber,
      walletAccountNumber: userWalletAccountNumber,
    })
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'Not able to find User',
        });
      } else if (walletAmount > user.walletAccountBalance) {
        return res.status(400).json({
          error: 'Entered Amount is greater than Available wallat Balance',
        });
      } else {
        user.accountBalance = user.accountBalance + walletAmount;
        console.log(user.accountBalance);
        user.walletAccountBalance = user.walletAccountBalance - walletAmount;
        console.log(user.walletAccountBalance);
        user.save();
        res.json(user);
      }
    });
    
    //Creating JSON to save wallet transaction
    const walletTransaction = {
      walletAccountNumber: req.body.walletAccountNumber,
      category: "wallet",
      subcategory: "WalletToAccount",
      amount: walletAmount,
      date: now,
  
    }
    
    //Creating JSON to save account transaction
    const accountTransaction = {
      walletAccountNumber: req.body.walletAccountNumber,
      category: req.body.category,
      subcategory: "WalletToAccount",
      amount: walletAmount,
      date: now,
  
    }
  
    const saveTransaction = new newTransaction(walletTransaction);
    const saveAccountTransaction = new newTransaction(accountTransaction);
      try{
      //Saving wallet transaction in new transactions collection
        await saveTransaction.save();
      //Saving account transaction to new transactions collection
        await saveAccountTransaction.save();
      }catch(error){
        return res.status(400).json({
          error: "Unable to save transaction"
        });
      }


  };
