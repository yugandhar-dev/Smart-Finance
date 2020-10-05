const NewUser = require("../../models/createNewUser");
const userBalance = require("../../models/balance");
const userdetails = require("../../models/user");

exports.CreateUser = (req, res) => {
 
    userBalance.find((err, docs) => {
      if (err) {
        return res.status(400).json({
          error: "Not able to find users information"
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
        exchangeTradedFund: 0,
        savingScheme: 0,
        totalfunds: 0
      };

      const newBalance = new userBalance(updateUser);

      newBalance.save((err, newBalance) => {
        if (err) {
          return res.status(400).json({
            error: "not able to update user information"
          });
          
        }
      });

      const newUser = new NewUser({
        accountNumber: req.body.accountNumber,
        walletAccountNumber: walletaccountnumber,
        emailId: req.body.emailId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bankName: req.body.bankName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        tfnNumber: req.body.tfnNumber,
        openingBalance: req.body.openingBalance
      });

      newUser.save((err, newUser) => {
        
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Not able to Create User"
          });
          
        }

      //Updating user table with user credentials
      var userInfo = {
        email: req.body.emailId,
        password: userdetails.securePassword("1234"),
        name: req.body.firstName,
        lastname: req.body.lastName,
        accountNumber: req.body.accountNumber,
        walletAccountNumber: walletaccountnumber,
        role: req.body.role,
        activationStatus: "N"
      };
      
      const createUser = new userdetails.User(userInfo);
      createUser.save((err, createuser) => {
        if (err) {
          
          return res.status(400).json({
            error: "not able to update user information"
          });
          
          
        }
        
      });
    });

    return res.status(200).json({
      Success: "User is signed Up"
    });
  });
};

exports.UpdateBalance = (req, res) => {};
