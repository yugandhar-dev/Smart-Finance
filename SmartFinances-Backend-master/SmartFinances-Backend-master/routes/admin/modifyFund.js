var express = require("express");
var router = express.Router();

const {
    modifyFund,
} = require("../../controllers/admin/modifyFund");

router.post("/admin/modifyfund", modifyFund);

module.exports = router;
