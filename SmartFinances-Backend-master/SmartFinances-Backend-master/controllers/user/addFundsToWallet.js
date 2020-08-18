const usersWalletBalance = require("../../models/balance");

exports.addWalletFunds = (req, res) => {
  const userWalletBalance = new usersWalletBalance(req.body);
  const walletAmount = req.body.walletFund;
  const accountNumber = req.body.accountNumber;

  usersWalletBalance
    .findOne({ accountNumber: accountNumber })
    .exec((err, user) => {
      if (err || user.length == 0) {
        return res.status(400).json({
          error: "Not able to find User"
        });
      } else if (walletAmount > user.accountBalance) {
        return res.status(400).json({
          error: "Entered Amount is greater than Account Balance"
        });
      } else {
        var accountBalance = user.accountBalance;
        var updateAccountBalance = accountBalance - walletAmount;
        var walletUpdate = user.walletAccountBalance + walletAmount;

        updatewalletbalance(accountNumber, walletUpdate, updateAccountBalance);
      }
    });

  function updatewalletbalance(
    accountNumber,
    walletUpdate,
    updateAccountBalance
  ) {
    usersWalletBalance
      .updateOne(
        { accountNumber: accountNumber },
        {
          accountBalance: updateAccountBalance,
          walletAccountBalance: walletUpdate
        }
      )
      .exec((err, balances) => {});
    res.json(usersWalletBalance);
  }
};