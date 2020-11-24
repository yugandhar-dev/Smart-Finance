var express = require("express");
var router = express.Router();

const {
  GetInvestments,
  GetInvestmentOptions,
  GetAllInvestmentsOptions,
  GetInvestmentCompanies,
} = require("../../controllers/user/getInvestments");

router.post("/user/getinvestments", GetInvestments);
router.post("/user/investmentOptions", GetInvestmentOptions);
router.get("/user/allInvestments", GetAllInvestmentsOptions);
router.post("/user/company", GetInvestmentCompanies);

module.exports = router;
