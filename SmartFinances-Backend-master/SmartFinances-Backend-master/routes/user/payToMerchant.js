var express = require("express");
var router = express.Router();

const { UserPayToMerchant } = require("../../controllers/user/payToMerchant");

router.post("/user/payToMerchant", UserPayToMerchant);

module.exports = router;
