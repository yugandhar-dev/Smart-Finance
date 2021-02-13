var express = require("express");
var router = express.Router();

const {
    AdminCreateion,
} = require("../../controllers/admin/admins");

router.post("/admin/admins", AdminCreateion);

module.exports = router;