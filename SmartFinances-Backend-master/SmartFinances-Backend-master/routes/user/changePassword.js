var express = require("express");
var router = express.Router();

const { ChangePassword } = require("../../controllers/user/changePassword");

router.post("/user/changePassword", ChangePassword);

module.exports = router;