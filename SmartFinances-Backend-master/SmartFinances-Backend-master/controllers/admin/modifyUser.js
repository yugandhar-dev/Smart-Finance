const user = require("../../models/createNewUser");
const userAuthDetails = require("../../models/user");
const userBalances = require("../../models/balance");

exports.modifyUser = async (req, res) => {
  let userDetails;
  let usertfnNumber;
  let useremailId;
  let useraddress;
  let accountNumber;
  let userBalanceDetails;
  let check = 0;

  //Finding User details in createNewUser collection
  try {
    userDetails = await user
      .findOne({
        $or: [
          { accountNumber: req.body.accountNumber },
          { emailId: req.body.emailId }
        ]
      })
      .exec();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
  if (!userDetails) {
    return res.status(400).json({
      error: "User Details not found. Please provide valid customer details."
    });
  }

  //Finding User Balance details from Balances collection
  try {
    userBalanceDetails = await userBalances
      .findOne({ accountNumber: userDetails.accountNumber })
      .exec();
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
  if (!userBalanceDetails) {
    return res.status(400).json({
      error: "User details not found in balances. Please provide valid Inputs"
    });
  }

  if (req.body.tfnNumber == null) {
    usertfnNumber = userDetails.tfnNumber;
  } else {
    usertfnNumber = req.body.tfnNumber;
  }

  if (req.body.emailId == null) {
    useremailId = userDetails.emailId;
  } else {
    useremailId = req.body.emailId;
  }

  if (req.body.address == null) {
    useraddress = userDetails.address;
  } else {
    useraddress = req.body.address;
  }

  if (req.body.accountNumber !== userDetails.accountNumber) {
    check = 1;
    accountNumber = req.body.accountNumber;
  } else {
    accountNumber = userDetails.accountNumber;
  }

  //Checking the update type and navigating to corresponding update
  if (check === 0) {
    try {
      await user
        .updateOne(
          { accountNumber: req.body.accountNumber },
          {
            tfnNumber: usertfnNumber,
            emailId: useremailId,
            address: useraddress
          }
        )
        .exec();
    } catch (err) {
      return res.status(400).json({
        error: err
      });
    }
  } else {
    try {
      await user
        .updateOne(
          { emailId: userDetails.emailId },
          {
            accountNumber: accountNumber,
            tfnNumber: usertfnNumber,
            address: useraddress
          }
        )
        .exec();
    } catch (err) {
      return res.status(400).json({
        error: "Not able to update user details. Try again"
      });
    }

    try {
      await userAuthDetails.User.updateOne(
        { email: req.body.emailId },
        { accountNumber: req.body.accountNumber }
      ).exec();
    } catch (err) {
      return res.status(400).json({
        error: "Not able to update user Auth details. Try again"
      });
    }

    try {
      await userBalances
        .updateOne(
          { walletAccountNumber: userBalanceDetails.walletAccountNumber },
          { accountNumber: req.body.accountNumber }
        )
        .exec();
    } catch (err) {
      return res.status(400).json({
        error: "Not able to update user balance details. Try again"
      });
    }
  }

  return res.status(200).json({
    Success: "User details modified"
  });
};
