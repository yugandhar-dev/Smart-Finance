var express = require("express");
var router = express.Router();

const { InvestmentFunds } = require("../../controllers/user/userInvestments");

router.post("/user/userinvestments", InvestmentFunds);

module.exports = router;
