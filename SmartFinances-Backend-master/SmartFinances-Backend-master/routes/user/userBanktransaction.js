var express = require("express");
var router = express.Router();
 
const { userBanktran } = require("../../controllers/user/userBanktransaction");
 
router.post("/user/userBanktransaction", userBanktran);
 
module.exports = router;