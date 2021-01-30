var express = require('express');
var router = express.Router();

const { profileSettings } = require('../../controllers/user/settings');

router.post('/user/settings', profileSettings);

module.exports = router;
