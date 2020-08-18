const userBalance = require("../../models/balance");

//Updates Source Wallet Balance
const updateSourceWalletBalance = async (
  res,
  sourceAccountNumber,
  sourceUpdatedBalance
) => {
  try {
    let sourceBalance = await userBalance
      .updateOne(
        { accountNumber: sourceAccountNumber },
        { walletAccountBalance: sourceUpdatedBalance }
      )
      .exec();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

//Updates Destination Wallet Balance
const updateDestinationWalletBalance = async (
  res,
  destinationAccountNumber,
  destinationUpdatedBalance
) => {
  try {
    let destinationBalance = await userBalance
      .updateOne(
        { accountNumber: destinationAccountNumber },
        { walletAccountBalance: destinationUpdatedBalance }
      )
      .exec();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

exports.UserPayToMerchant = async (req, res) => {
  const sourceAccountNumber = req.body.sourceAccountNumber;
  const destinationAccountNumber = req.body.destinationAccountNumber;
  const amount = req.body.amount;
  let sourceUser;
  try {
    sourceUser = await userBalance
      .findOne({ accountNumber: sourceAccountNumber })
      .exec();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }

  if (!sourceUser) {
    return res.status(400).json({
      error: "Not able find Source User information  "
    });
  }

  var sourceWalletAccountBalance = sourceUser.walletAccountBalance;

  if (amount > sourceWalletAccountBalance) {
    return res.status(400).json({
      error: "Entered amount is more than the current wallet balance.  "
    });
  }
  var sourceUpdatedBalance = sourceWalletAccountBalance - amount;

  updateSourceWalletBalance(res, sourceAccountNumber, sourceUpdatedBalance);
  let destinationUser;
  try {
    destinationUser = await userBalance
      .findOne({ accountNumber: destinationAccountNumber })
      .exec();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }

  if (!destinationUser) {
    return res.status(400).json({
      error: "Not able  to find the Destination user information "
    });
  }

  var destinationWalletBalance = destinationUser.walletAccountBalance;
  var destinationUpdatedBalance = destinationWalletBalance + amount;

  updateDestinationWalletBalance(
    res,
    destinationAccountNumber,
    destinationUpdatedBalance
  );

  res.status(200).json({
    Success: "Wallet Balances are updated"
  });
};
