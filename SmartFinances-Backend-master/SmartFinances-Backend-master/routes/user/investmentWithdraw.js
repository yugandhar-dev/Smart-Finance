var express = require("express");
var router = express.Router();

const {
  InvestmentWithdraw
} = require("../../controllers/user/investmentWithdraw");
router.post("/user/investmentwithdraw", InvestmentWithdraw);

module.exports = router;
