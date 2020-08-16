const Portfolio = require("./../../models/balance");
const portfolio = Portfolio.portfolio;

exports.userDashboard = (req, res) => {
  Portfolio.find({ accountNumber: req.body.accNumber }).exec((err, porfolio) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(porfolio);
  });
};
