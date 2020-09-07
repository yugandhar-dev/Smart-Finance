const transactions = require("../../models/newTransaction");

exports.GetTransactions = (req, res) => {
    transactions.find({walletAccountNumber: req.body.walletAccountNumber}).exec((err,userTransactions) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }else if(!userTransactions){
            return res.status(400).json({
                error: "No User Transactions Found"
            });
        }else{
            res.json(userTransactions);
        }
    });

};
