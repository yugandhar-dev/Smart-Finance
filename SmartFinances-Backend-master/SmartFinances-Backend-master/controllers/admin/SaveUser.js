const userSignUp = require('../../models/usersignup');
const adminNewUsers = require('../../models/createNewUser');
const userLogins = require('../../models/user');
const balances = require('../../models/balance');

exports.SaveUser = async (req, res) => {
  try {
    const user = await userSignUp.findOne({ email: req.body.emailId });
    user.isVerified = true;

    await user.save();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
