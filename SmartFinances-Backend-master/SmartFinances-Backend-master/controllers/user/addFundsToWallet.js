const usersWalletBalance = require("../../models/balance");
const newTransaction = require("../../models/newTransaction");

exports.addWalletFunds = async (req, res) => {
  const walletAmount = parseInt(req.body.walletFund);
  const now = new Date();
  let user;
  try{
    user = await usersWalletBalance.findOne({ walletAccountNumber: req.body.walletAccountNumber }).exec();

  }catch(err){
    return res.status(400).json({
      error: err
    });
  }if (!user) {
        return res.status(400).json({
          error: "Not able to find User"
        });
      } else if (walletAmount > user.accountBalance) {
        return res.status(400).json({
          error: "Entered Amount is greater than Account Balance"
        });
      } else {
        var accountBalance = user.accountBalance;
        user.accountBalance = accountBalance - walletAmount;
        user.walletAccountBalance = user.walletAccountBalance+walletAmount;
        user.save();
        res.json(user);
      }
    

    //Save transaction to new Transactions collection with category and subcategory
  const walletTransaction = {
    walletAccountNumber: req.body.walletAccountNumber,
    category: req.body.category,
    subcategory: "AccountToWallet",
    amount: walletAmount,
    date: now,

  }
  
  const accountTransaction = {
    walletAccountNumber: req.body.walletAccountNumber,
    category: "account",
    subcategory: "AccountToWallet",
    amount: walletAmount,
    date: now,

  }

  
  const saveTransaction = new newTransaction(walletTransaction);
  const saveAccountTransaction = new newTransaction(accountTransaction);
    try{
      //save transaction with category of wallet
      await saveTransaction.save();

      //save transaction with  category of account
      await saveAccountTransaction.save();
    }catch(error){
      return res.status(400).json({
        error: "Unable to save transaction"
      });
    }
    
    
  
    };
