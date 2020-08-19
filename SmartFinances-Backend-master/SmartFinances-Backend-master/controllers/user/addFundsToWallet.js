const usersWalletBalance = require("../../models/balance");
exports.addWalletFunds = (req, res) => {
  const walletAmount = parseInt(req.body.walletFund);
  const accountNumber = req.body.accountNumber;

  usersWalletBalance
    .findOne({ accountNumber: accountNumber })
    .exec((err, user) => {
      if (err || !user) {
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
    })
    };
