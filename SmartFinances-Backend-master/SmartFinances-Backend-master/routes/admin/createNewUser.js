var express = require("express");
var router = express.Router();

const { CreateUser } = require("../../controllers/admin/createNewUser");

router.post(
  "/admin/createNewUser",

  CreateUser
);

module.exports = router;
