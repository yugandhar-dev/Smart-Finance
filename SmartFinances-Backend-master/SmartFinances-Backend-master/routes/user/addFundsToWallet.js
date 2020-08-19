var express = require("express");
var router = express.Router();

const { addWalletFunds } = require("../../controllers/user/addFundsToWallet");
router.post("/user/walletbalance", addWalletFunds);

module.exports = router;