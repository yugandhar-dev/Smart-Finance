const usersWalletBalance = require("../../models/balance");
exports.InvestmentWithdraw = (req, res) => {
  const walletAmount = parseInt(req.body.walletFund);
  const userAccountNumber = req.body.accountNumber;

  usersWalletBalance
    .findOne({ accountNumber: userAccountNumber })
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Not able to find User"
        });
      } else if (walletAmount > user.walletAccountBalance) {
        return res.status(400).json({
          error: "Entered Amount is greater than Available wallat Balance"
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
};
