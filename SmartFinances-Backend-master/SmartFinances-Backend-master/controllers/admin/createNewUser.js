const NewUser = require("../../models/createNewUser");
const Ubalance = require("../../models/balance");
const user = require("../../models/user");

exports.CreateUser = (req, res) => {
  const newUser = new NewUser(req.body);
  //const obalance = req.body.openingBalance;
  //const accNumber = req.body.accountNumber;

  newUser.save((err, newUser) => {
    if (err) {
      res.status(400).json({
        error: "Not able to Create User",
      });
      return;
    }

    //Updating balance collection after admin adds new user
    var nUser = {
      accountNumber: req.body.accountNumber,
      walletAccountNumber: 1,
      accBalance: req.body.openingBalance,
      walletAccBalance: 0,
      lowRiskFund: 0,
      mediumRiskFund: 0,
      highRiskFund: 0,
      totalfunds: 0,
      dummy: 0,
    };

    const nbalance = new Ubalance(nUser);

    nbalance.save((err, nbalance) => {
      //console.log(nbalance);
      if (err) {
        res.status(400).json({
          error: "not able to update user information",
        });
        return;
      }
    });

    //Updating user table with user credentials
    var userInfo = {
      name: req.body.firstName,
      email: req.body.emailId,
    };

    const createUser = new user(userInfo);
    createUser.save((err, createUser) => {
      if (err) {
        res.status(400).json({
          error: "not able to update user information",
        });
        return;
      }
    });

    res.json({ newUser });
  });
};

exports.UpdateBalance = (req, res) => {};
