const Transaction = require("../../models/newTransaction");
const Abalance = require("../../models/balance");

exports.AddTransaction = (req, res) => {
  var accNumber = req.body.account;
  //var accNumber = 123;
  const transaction = new Transaction(req.body);
  transaction.save((err, transaction) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save transaction",
      });
    }
    res.json({ transaction });
  });
  Abalance.find({ accountNumber: accNumber }).exec((err, users) => {
    // console.log(users);
    if (err || users.length == 0) {
      return res.status(400).json({
        error: "Not able to update transaction",
      });
    }
    console.log(users[0].accBalance);
    var bal = users[0].accBalance;
    var fundop = users[0].lowRiskFund;
    var fundopt = users[0].mediumRiskFund;
    var fundOpt = users[0].highRiskFund;
    var totalfund = users[0].totalfunds;
    console.log(users[0].accBalance);
    // console.log(bal);
    var ubalance =
      parseInt(bal) -
      parseInt(req.body.amount) -
      parseInt(req.body.roundedAmount);

    // console.log(ubalance);
    // console.log(fundop);
    if (req.body.fund == "lowRiskFund") {
      var fundoptionsnew = parseInt(fundop) + parseInt(req.body.roundedAmount);
      var totalsavedfunds = totalfund + parseInt(req.body.roundedAmount);
      // console.log(fundoptionsnew);
      Abalance.updateOne(
        { accountNumber: accNumber },
        {
          accBalance: ubalance,
          lowRiskFund: fundoptionsnew,
          // totalfunds: totalsavedfunds,
        }
      ).exec((err, balances) => {
        console.log(balances);
      });
    } else if (req.body.fund == "mediumRiskFund") {
      var fundoptionsnew = parseInt(fundopt) + parseInt(req.body.roundedAmount);
      var totalsavedfunds = totalfund + parseInt(req.body.roundedAmount);
      // console.log(fundoptionsnew);
      Abalance.updateOne(
        { accountNumber: accNumber },
        {
          accBalance: ubalance,
          mediumRiskFund: fundoptionsnew,
          totalfunds: totalsavedfunds,
        }
      ).exec((err, balances) => {
        console.log(balances);
      });
    } else {
      var fundoptionsnew = parseInt(fundOpt) + parseInt(req.body.roundedAmount);
      var totalsavedfunds = totalfund + parseInt(req.body.roundedAmount);
      console.log(fundoptionsnew);
      Abalance.updateOne(
        { accountNumber: accNumber },
        {
          accBalance: ubalance,
          highRiskFund: fundoptionsnew,
          totalfunds: totalsavedfunds,
        }
      ).exec((err, balances) => {
        console.log(balances);
      });
    }

    if (err || users == null) {
      return res.status(400).json({
        error: "Not able to update balance",
      });
    }
  });
};
