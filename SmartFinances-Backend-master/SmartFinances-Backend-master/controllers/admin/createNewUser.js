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

    Ubalance.find((err,val) => {
      if(err){
        console.log("Cannot find documents");
      }
      else {
        var len = val.length;
        var splitaccountnumber = val[len-1].walletAccountNumber.split("00");
        var ret = parseInt(splitaccountnumber[1])+1;
        var prefix = "SFW00";
        var waccnum = prefix + ret;
      }
    //Updating balance collection after admin adds new user
    var nUser = {
      accountNumber: req.body.accountNumber,
      walletAccountNumber: waccnum,
      accBalance: req.body.openingBalance,
      walletAccBalance: 0,
      lowRiskFund: 0,
      mediumRiskFund: 0,
      highRiskFund: 0,
      totalfunds: 0,
    };
    });
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

    const createUser = new user(userInfo)
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

exports.UpdateBalance = (req, res) => {}
