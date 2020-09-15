var express = require("express");
var router = express.Router();

const {
  adminmanageUser,
  getUserPhoneNumber,
} = require("../../controllers/admin/manageUser");

router.post("/admin/manageUser/", adminmanageUser);
router.post("/admin/getPhoneNumber/", getUserPhoneNumber);

module.exports = router;
