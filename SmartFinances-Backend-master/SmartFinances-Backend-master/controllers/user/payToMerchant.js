const userBalance = require("../../models/balance");

exports.UserPayToMerchant = (req, res) => {
  var sourceAccountNumber = req.body.sAccountNumber;
  var destinationAccountNumber = req.body.dAccountNumber;
  var amount = req.body.amount;

  userBalance
    .findOne({ accountNumber: sourceAccountNumber })
    .exec((err, sourceUser) => {
      if (err || sourceUser.length == 0) {
        return res.status(400).json({
          error: "Not able find User  "
        });
      }

      var sourceWalletAccountBalance = sourceUser.walletAccountBalance;

      if (amount > sourceWalletAccountBalance) {
        return res.status(400).json({
          error: "Entered amount is more than the current wallet balance.  "
        });
      } else {
        var sourceUpdatedBalance = sourceWalletAccountBalance - amount;

        updateSourceWalletBalance(sourceAccountNumber, sourceUpdatedBalance);
        userBalance
          .findOne({ accountNumber: destinationAccountNumber })
          .exec((err, destinationUser) => {
            if (err) {
              return res.status(400).json({
                error: "Unable to find the Destination user information "
              });
            } else {
              var destinationWalletBalance =
                destinationUser.walletAccountBalance;
              var destinationUpdatedBalance = destinationWalletBalance + amount;
              updateDestinationWalletBalance(
                destinationAccountNumber,
                destinationUpdatedBalance
              );
            }
          });
      }
    });

  const updateSourceWalletBalance = (
    sourceAccountNumber,
    sourceUpdatedBalance
  ) =>
    userBalance
      .updateOne(
        { accountNumber: sourceAccountNumber },
        { walletAccountBalance: sourceUpdatedBalance }
      )
      .exec((err, balance) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to update Source Wallet Balance "
          });
        }
        res.status(200).json({
          Success: "Updated source user wallet Balance"
        });
      });

  const updateDestinationWalletBalance = (
    destinationAccountNumber,
    destinationUpdatedBalance
  ) =>
    userBalance
      .updateOne(
        { accountNumber: destinationAccountNumber },
        { walletAccountBalance: destinationUpdatedBalance }
      )
      .exec((err, balance) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to update destination Wallet Balance "
          });
        }
      });
};
