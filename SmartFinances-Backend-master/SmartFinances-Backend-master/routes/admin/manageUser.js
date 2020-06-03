var express = require("express");
var router = express.Router();

const { adminmanageUser } = require("../../controllers/admin/manageUser");

router.post("/admin/manageUser/", adminmanageUser);

module.exports = router;
