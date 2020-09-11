var express = require("express");
var router = express.Router();

const {
	GetInvestments,
	GetInvestmentOptions,
} = require("../../controllers/user/getInvestments");
router.post("/user/getinvestments", GetInvestments);
router.post("/user/investmentOptions", GetInvestmentOptions);

module.exports = router;
