var express = require("express");
var router = express.Router();

const { InvestmentSell } = require("../../controllers/user/investmentSell");
router.post("/user/investmentsell", InvestmentSell);

module.exports = router;


