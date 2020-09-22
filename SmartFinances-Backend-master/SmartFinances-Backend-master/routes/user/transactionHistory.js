var express = require("express");
var router = express.Router();

const { GetTransactions } = require("../../controllers/user/transactionHistory");
router.get("/user/transactionhistory", GetTransactions);

module.exports = router;
