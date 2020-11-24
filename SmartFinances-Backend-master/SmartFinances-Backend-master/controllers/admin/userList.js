const User = require("../../models/createNewUser");

exports.GetUsers = async (req, res) => {
  const data = await new Promise((resolve) =>
    User.find({}, (err, users) => {
      if (err) {
        resolve({
          error: err,
        });
      } else if (users.length == 0) {
        resolve({
          error: "No users found",
        });
      } else {
        resolve(users);
      }
    })
  );
  if (data["error"]) {
    res.status(400).json({
      error: data["error"],
    });
  } else {
    res.status(200).json(data);
  }
};
