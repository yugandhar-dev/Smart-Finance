const transactions = require("../../models/newTransaction");

exports.GetTransactions = (req, res) => {
<<<<<<< HEAD
    
    transactions.find({walletAccountNumber: req.body.walletAccountNumber, category: req.body.category}).exec((err,userTransactions) => {
=======
    transactions.find({walletAccountNumber: req.body.walletAccountNumber}).exec((err,userTransactions) => {
>>>>>>> 6f31fc7... feat: initial commit for transactionhistory feature
        if(err){
            return res.status(400).json({
                error: err
            });
<<<<<<< HEAD
        }else if(userTransactions.length == 0){
=======
        }else if(!userTransactions){
>>>>>>> 6f31fc7... feat: initial commit for transactionhistory feature
            return res.status(400).json({
                error: "No User Transactions Found"
            });
        }else{
            res.json(userTransactions);
        }
    });

};
