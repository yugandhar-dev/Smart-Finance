const ManageFund = require("../../models/createFund");

exports.adminManageFund = (req, res) => {
  var id = req.body.fundId;
  console.log(id);

  ManageFund.findOne({ fundId: id }).exec((err, fund) => {
    if (err || fund == null) {
      return res.status(400).json({
        error: "No table is found with tfnNumber",
      });
    }
    res.json(fund);
  });
};
