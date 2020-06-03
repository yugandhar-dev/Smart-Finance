var express = require("express");
var router = express.Router();

const {
  fundOptions,
  getLowRiskFund,
  getMediumRiskFund,
  getHighRiskFund,
} = require("../../controllers/user/userFundOptions");

router.get("/user/fundoptions", fundOptions);
router.get("/user/fundOptions/lowRiskFund", getLowRiskFund);
router.get("/user/fundOptions/mediumRiskFund", getMediumRiskFund);
router.get("/user/fundOptions/highRiskFund", getHighRiskFund);
module.exports = router;
