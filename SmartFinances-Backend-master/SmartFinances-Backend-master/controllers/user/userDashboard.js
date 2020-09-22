const Portfolio = require("./../../models/balance");
const portfolio = Portfolio.portfolio;
const ManageUser = require("../../models/createNewUser");

exports.userDashboard = (req, res) => {
  Portfolio.find({ accountNumber: 123 }).exec((err, porfolio) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(porfolio);
  });
};

exports.getEmailId = async (req, res) => {
  const { accountNumber } = req.body;
  try {
    const user = await ManageUser.findOne({
      accountNumber,
    });
    if (!user) return res.status(404).json({ error: "No User found" });
    return res.json({ emailId: user.emailId });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
};
