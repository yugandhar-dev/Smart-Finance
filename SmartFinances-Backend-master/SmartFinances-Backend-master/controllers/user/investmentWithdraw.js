const usersWalletBalance = require('../../models/balance');
const newTransaction = require("../../models/newTransaction");
 
exports.InvestmentWithdraw = async (req, res) => {
 const walletAmount = parseFloat(req.body.walletFund);
 const userAccountNumber = req.body.accountNumber;
 const userWalletAccountNumber = req.body.walletAccountNumber;
 const now = new Date();
 let user;
 
 try{
 user = await usersWalletBalance
 .findOne({
 accountNumber: userAccountNumber,
 walletAccountNumber: userWalletAccountNumber,
 }).exec();
 
 }catch(err){
 return res.status(400).json({
 error: err
 });
 }
 if (!user) {
 return res.status(400).json({
 error: 'Not able to find User',
 });
 } else if (walletAmount > user.walletAccountBalance) {
 return res.status(400).json({
 error: 'Entered Amount is greater than Available wallat Balance',
 });
 } else {
 user.accountBalance = user.accountBalance + walletAmount;
 user.walletAccountBalance = user.walletAccountBalance - walletAmount;
 await user.save();
 }
 
 const walletTransaction = {
 walletAccountNumber: req.body.walletAccountNumber,
 category: req.body.category,
 subcategory: "WalletToAccount",
 amount: walletAmount,
 date: now,
 
 }
 
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
 await saveTransaction.save();
 await saveAccountTransaction.save();
 }catch(error){
return res.status(400).json({
 error: "Unable to save transaction"
 });
 } 
 
 
 return res.status(200).json({
 Success: "Withdrawn successfully and Balances are updated"
 });
 
 
 
 
 
 
 
};