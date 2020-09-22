var express = require("express");
var router = express.Router();

const {
	GetInvestments,
	GetInvestmentOptions,
	GetAllInvestmentsOptions,
} = require("../../controllers/user/getInvestments");

router.post("/user/getinvestments", GetInvestments);
router.post("/user/investmentOptions", GetInvestmentOptions);
router.get("/user/allInvestments", GetAllInvestmentsOptions);

module.exports = router;
