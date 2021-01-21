const usertran = require('../../models/userBanktransaction');

exports.userBanktran = (req, res) => {
  usertran.find((err, userbank) => {
    if (err) {
      return res.status(400).json({
        error: 'Internal Server error',
      });
    }
    res.json(userbank);
  });
};
