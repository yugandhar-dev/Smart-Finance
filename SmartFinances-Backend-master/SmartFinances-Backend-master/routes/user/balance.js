var express = require("express");
var router = express.Router();
 
const { UserGetBalance } = require("../../controllers/user/balance");
 
router.post("/user/balance", UserGetBalance);
 
module.exports = router;