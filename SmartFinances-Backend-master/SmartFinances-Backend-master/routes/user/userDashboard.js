var express = require("express");
var router = express.Router();

const {
  userDashboard,
  getEmailId,
} = require("../../controllers/user/userDashboard");

router.get("/user/dashboard", userDashboard);
router.post("/user/getEmailId/", getEmailId);

module.exports = router;
