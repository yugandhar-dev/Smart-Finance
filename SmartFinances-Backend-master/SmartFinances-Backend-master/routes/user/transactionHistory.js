var express = require("express");
var router = express.Router();

const { GetTransactions } = require("../../controllers/user/transactionHistory");
router.post("/user/transactionhistory", GetTransactions);

module.exports = router;
