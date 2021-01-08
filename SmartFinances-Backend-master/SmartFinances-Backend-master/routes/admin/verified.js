var express = require("express");
var router = express.Router();

const { VerifiedUsers } = require("../../controllers/admin/verified");
router.get("/admin/verified", VerifiedUsers);

module.exports = router;
