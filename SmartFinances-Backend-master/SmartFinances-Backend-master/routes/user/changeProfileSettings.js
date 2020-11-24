var express = require("express");
var router = express.Router();

const {
	ChangeProfileSettings,
} = require("../../controllers/user/changeProfileSettings");

router.post("/user/changeProfileSettings", ChangeProfileSettings);

module.exports = router;
