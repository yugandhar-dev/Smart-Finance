var express = require("express");
var router = express.Router();

const { AddTransaction } = require("../../controllers/user/newTransaction");

router.post(
  "/user/newTransaction",

  AddTransaction
);

module.exports = router;
