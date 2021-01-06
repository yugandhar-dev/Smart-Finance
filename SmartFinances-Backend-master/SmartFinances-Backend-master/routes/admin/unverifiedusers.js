var express = require("express");
var router = express.Router();

const { UnVerified } = require("../../controllers/admin/unverifiedusers");
router.get("/admin/unverifiedusers", UnVerified);

module.exports = router;
