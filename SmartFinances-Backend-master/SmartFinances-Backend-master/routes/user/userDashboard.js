var express = require("express");
var router = express.Router();

const { userDashboard } = require("../../controllers/user/userDashboard");

router.get("/user/dashboard", userDashboard);

module.exports = router;
