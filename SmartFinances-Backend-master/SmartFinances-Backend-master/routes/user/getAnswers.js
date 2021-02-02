var express = require('express');
var router = express.Router();

const { Answers } = require('../../controllers/user/getAnswers');

router.get('/user/questionnaireAnswers', Answers);

module.exports = router;
