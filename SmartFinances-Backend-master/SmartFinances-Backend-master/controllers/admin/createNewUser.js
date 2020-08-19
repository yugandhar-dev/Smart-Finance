const NewUser = require("../../models/createNewUser");
const userBalance = require("../../models/balance");
const userdetails = require("../../models/user");

exports.CreateUser = (req, res) => {
  const newUser = new NewUser(req.body);

  newUser.save((err, newUser) => {
    if (err) {
      res.status(400).json({
        error: "Not able to Create User"
      });
      return;
    }

    userBalance.find((err, docs) => {
      if (err) {
        res.status(400).json({
          error: "Not able to find user information"
        });
      } else {
        var prefix = "SFW";
        var len = docs.length;
        var increment = len + 1;
        var walletaccountnumber =
          prefix + increment.toString().padStart(3, "0");
      }
      //Updating balance collection after admin adds new user
      var updateUser = {
        accountNumber: req.body.accountNumber,
        walletAccountNumber: walletaccountnumber,
        accountBalance: req.body.openingBalance,
        walletAccountBalance: 0,
        lowRiskFund: 0,
        mediumRiskFund: 0,
        highRiskFund: 0,
        totalfunds: 0
      };

      const newBalance = new userBalance(updateUser);

      newBalance.save((err, newBalance) => {
        if (err) {
          res.status(400).json({
            error: "not able to update user information"
          });
          return;
        }
      });

      //Updating user table with user credentials
      var userInfo = {
        name: req.body.firstName,
        email: req.body.emailId
      };

      const createUser = new userdetails.User(userInfo);
      createUser.save((err, createuser) => {
        if (err) {
          res.status(400).json({
            error: "not able to update user information"
          });
          return;
        }
      });
    });

    res.json({ newUser });
  });
};

exports.UpdateBalance = (req, res) => {};
