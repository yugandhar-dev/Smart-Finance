const NewUser = require("../../models/createNewUser");
const userBalance = require("../../models/balance");
const user = require("../../models/user");

exports.CreateUser = (req, res) => {
  const newUser = new NewUser(req.body);
  
  newUser.save((err, newUser) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Not able to Create User",
      });
      return;
    }

    userBalance.find((err,val) => {
      if(err){
        console.log("Cannot find documents");
      }
      else {
        var len = val.length;
        
        if(len==0){
          var prefix = "SFW00";
          var  addAccountNumber = 1;
        }
        else if(len>0 && len<9){
        var splitaccountnumber = val[len-1].walletAccountNumber.split("00");
        var addAccountNumber = parseInt(splitaccountnumber[1])+1;
        var prefix = "SFW00";
        } else if(len==9){
        var splitaccountnumber = val[len-1].walletAccountNumber.split("00");
        var addAccountNumber = parseInt(splitaccountnumber[1])+1;
        var prefix = "SFW0";
        }
        else if(len>9 && len<99){
        var splitaccountnumber = val[len-1].walletAccountNumber.split("W0");
        var addAccountNumber = parseInt(splitaccountnumber[1])+1;
        var prefix = "SFW0";
        } 
        else if(len==99){
          var splitaccountnumber = val[len-1].walletAccountNumber.split("W0");
          var addAccountNumber = parseInt(splitaccountnumber[1])+1;
          var prefix = "SFW";
        }
        else {
        var splitaccountnumber = val[len-1].walletAccountNumber.split("W");
        var addAccountNumber = parseInt(splitaccountnumber[1])+1;
        var prefix = "SFW";
        }
      var walletaccnum = prefix + addAccountNumber;
    }
    //Updating balance collection after admin adds new user
    var updateUser = {
      accountNumber: req.body.accountNumber,
      walletAccountNumber: walletaccnum,
      accBalance: req.body.openingBalance,
      walletAccBalance: 0,
      lowRiskFund: 0,
      mediumRiskFund: 0,
      highRiskFund: 0,
      totalfunds: 0,
    };
    
    const newBalance = new userBalance(updateUser);

    newBalance.save((err, newBalance) => {
      //console.log(newBalance);
      if (err) {
        res.status(400).json({
          error: "not able to update user information",
        });
        return;
      }
    });
  });

    //Updating user table with user credentials
    var userInfo = {
      name: req.body.firstName,
      email: req.body.emailId,
    };

    const createUser = new user(userInfo)
    createUser.save((err, createUser) => {
      if (err) {
        // res.status(400).json({
        //   error: "not able to update user information",
        // });
        return;
      }
    });

    res.json({ newUser });
  });  
  };

exports.UpdateBalance = (req, res) => {}
