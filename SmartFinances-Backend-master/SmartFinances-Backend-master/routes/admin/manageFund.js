var express = require("express");
var router = express.Router();

const { adminManageFund } = require("../../controllers/admin/manageFund");

router.post("/admin/manageFund/", adminManageFund);

module.exports = router;
