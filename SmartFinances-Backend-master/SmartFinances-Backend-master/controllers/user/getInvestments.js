const userInvestments = require("../../models/userInvestments");

exports.GetInvestments = (req, res) => {
  userInvestments.find().exec((err, investments) => {
    if (err || investments == null) {
      return res.status(400).json({
        error: "No Investments Found",
      });
    }
    res.json(investments);
  });
};
