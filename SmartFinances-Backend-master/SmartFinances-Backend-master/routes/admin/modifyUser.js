var express = require("express");
var router = express.Router();

const {
    modifyUser,
} = require("../../controllers/admin/modifyUser");

router.post("/admin/modifyuser", modifyUser);

module.exports = router;