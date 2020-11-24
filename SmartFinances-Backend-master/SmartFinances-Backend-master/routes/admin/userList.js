var express = require("express");
var router = express.Router();

const { GetUsers } = require("../../controllers/admin/userList");
router.get("/admin/userlist", GetUsers);

module.exports = router;
