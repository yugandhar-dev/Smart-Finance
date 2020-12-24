var express = require("express");
var router = express.Router();
 
const { UserSignUpPage } = require("../../controllers/user/registerUser");
 
router.post("/user/registerUser", UserSignUpPage);
 
module.exports = router;