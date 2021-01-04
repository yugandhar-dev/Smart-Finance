var express = require('express');
var router = express.Router();

const { SaveUser } = require('../../controllers/admin/SaveUser');

router.post('/admin/saveUser', SaveUser);

module.exports = router;
