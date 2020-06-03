const ManageUser = require("../../models/createNewUser");

exports.adminmanageUser = (req, res) => {
  var tfnnumber = req.body.tfnNumber;

  ManageUser.findOne({ tfnNumber: tfnnumber }).exec((err, user) => {
    if (err || user == null) {
      return res.status(400).json({
        error: "No table is found with tfnNumber",
      });
    }
    res.json(user);
  });
};
