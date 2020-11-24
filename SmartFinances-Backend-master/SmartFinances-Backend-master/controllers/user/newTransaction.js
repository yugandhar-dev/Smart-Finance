const Transaction = require("../../models/newTransaction");
const Abalance = require("../../models/balance");

exports.AddTransaction = (req, res) => {
  const accountNumber = req.body.account;
  console.log(req.body);
  
  const transaction = new Transaction(req.body);
  transaction.save((err, transaction) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save transaction",
      });
    }
    res.json({ transaction });
  });
  Abalance.find({ accountNumber }).exec((err, users) => {
    
    if (err || users.length == 0) {
      return res.status(400).json({
        error: "Not able to update transaction",
      });
    }
    var accountBalance = parseFloat(
      (
        parseFloat(users[0].accountBalance) -
        parseFloat(req.body.amount) -
        parseFloat(req.body.roundedAmount)
      ).toFixed(2)
    );

    const fundType = req.body.fund;
    const fundBalance =
      parseFloat(users[0][req.body.fund]) + parseFloat(req.body.roundedAmount);

    const totalFundsBalance = parseFloat(
      (users[0].totalfunds + parseFloat(req.body.roundedAmount)).toFixed(2)
    );
    console.log(fundType, fundBalance, totalFundsBalance);
    updateBalance(
      accountNumber,
      accountBalance,
      { [fundType]: fundBalance },
      totalFundsBalance
    );

    if (err || users == null) {
      return res.status(400).json({
        error: "Not able to update balance",
      });
    }
  });
};

const updateBalance = (
  accountNumber,
  accountBalance,
  fundOption,
  totalsavedfunds
) =>
  Abalance.updateOne(
    { accountNumber },
    {
      accountBalance: accountBalance,
      ...fundOption,
      totalfunds: totalsavedfunds,
    }
  ).exec((err, balances) => {
    console.log(balances);
  });
