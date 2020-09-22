const Funds = require("./../../models/createFund");

exports.getLowRiskFund = (req, res) => {
  Funds.find({ fundId: 12345 }).exec((err, funds) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }

    res.json(funds);
  });
  //  res.json("Fund Options");
};

exports.getMediumRiskFund = (req, res) => {
  Funds.find({ fundId: 22222 }).exec((err, funds) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }

    res.json(funds);
  });
  //  res.json("Fund Options");
};

exports.getHighRiskFund = (req, res) => {
  Funds.find({ fundId: 3344 }).exec((err, funds) => {
    if (err) {
      return res.status(400).json({
        error: "No categories found",
      });
    }

    res.json(funds);
  });
  //  res.json("Fund Options");
};
