var express = require("express");
var router = express.Router();
 
const { UserGoals } = require("../../controllers/user/goals");
 
router.post("/user/goals", UserGoals);
 
module.exports = router;