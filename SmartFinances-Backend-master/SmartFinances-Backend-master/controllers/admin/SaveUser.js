const userSignUp = require('../../models/usersignup');
const adminNewUsers = require('../../models/createNewUser');
const userLogins = require('../../models/user');
const balances = require('../../models/balance');
const { securePassword } = require('../../models/user');

exports.SaveUser = async (req, res) => {
  try {
    const user = await userSignUp.findOne({ email: req.body.emailId });
    user.isVerified = true;

    await user.save();

    const docs = await balances.find();
    console.log(docs);
    let prefix = 'SFW';
    let len = docs.length;
    let increment = len + 1;
    let walletaccountnumber = prefix + increment.toString().padStart(3, '0');

    const newUser = {
      accountNumber: user.accountNumber,
      walletAccountNumber: walletaccountnumber,
      emailId: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bankName: user.bankName,
      address: user.address,
      tfnNumber: user.tfnNumber,
      phoneNumber: parseInt('61' + user.phone),
      openingBalance: user.openingBalance,
    };
    const adminNew = new adminNewUsers(newUser);
    await adminNew.save();

    const userModel = {
      name: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: securePassword('12345'),
      role: 'user',
      accountNumber: user.accountNumber,
      walletAccountNumber: walletaccountnumber,
      activationStatus: 'Verified',
    };
    const newUserModel = new userLogins.User(userModel);
    await newUserModel.save();

    const balanceModel = {
      accountNumber: user.accountNumber,
      walletAccountNumber: walletaccountnumber,
      accountBalance: user.openingBalance,
      walletAccountBalance: user.openingBalance,
      lowRiskFund: 0,
      exchangeTradedFund: 0,
      savingScheme: 0,
      totalfunds: 0,
    };
    const newBalanceModel = new balances(balanceModel);
    await newBalanceModel.save();
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};
