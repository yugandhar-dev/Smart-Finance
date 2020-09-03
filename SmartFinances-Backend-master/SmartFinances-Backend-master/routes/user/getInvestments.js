var express = require("express");
var router = express.Router();

const { GetInvestments } = require("../../controllers/user/getInvestments");
router.get("/user/getinvestments", GetInvestments);

module.exports = router;


