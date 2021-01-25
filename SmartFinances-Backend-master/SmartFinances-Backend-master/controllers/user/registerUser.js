const userSign = require('../../models/usersignup');

exports.UserSignUpPage = (req, res) => {
  const usersSign = new userSign(req.body);
  usersSign.save((err, usersSign) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ usersSign });
  });
};
