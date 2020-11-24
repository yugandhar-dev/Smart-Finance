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

exports.getUserPhoneNumber = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await ManageUser.findOne({ emailId: email });
    if (!user) return res.status(404).json({ error: "No User found" });
    return res.json({ phoneNumber: user.phoneNumber });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
};
