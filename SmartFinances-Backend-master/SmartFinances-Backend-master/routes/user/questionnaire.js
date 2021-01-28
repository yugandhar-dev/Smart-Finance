var express = require("express");
var router = express.Router();

const { Questionnaire } = require("../../controllers/user/questionnaire");

router.post("/user/questionnaire", Questionnaire);

module.exports = router;
