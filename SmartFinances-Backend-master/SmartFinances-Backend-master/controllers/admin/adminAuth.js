const Admin = require("../../models/admin");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //Saving admin to DB
  const admin = new Admin(req.body);
  admin.save((err, admin) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      name: admin.name,
      email: admin.email,
      id: admin._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  Admin.findOne({ email }, (err, admin) => {
    if (err || !admin) {
      return res.status(400).json({
        error: "User email does not exist",
      });
    }

    //fix bug here --> !admin.authenticate --> email & password mismatch not working
    if (admin.authenticate(password)) {
      return res.status(401).json({
        error: " Email & password do not match",
      });
    }

    //Create token
    const token = jwt.sign({ _id: admin._id }, "smartfinances");
    //Put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to frontend
    const { _id, name, email, role } = admin;
    return res.json({ token, admin: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Admin Signout",
  });
};
