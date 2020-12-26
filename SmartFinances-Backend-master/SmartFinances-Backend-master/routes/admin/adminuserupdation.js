var express = require("express");
var router = express.Router();

const {
    Adminusrupdation,
} = require("../../controllers/admin/adminuserupdation");

router.post("/admin/adminuserupdation", Adminusrupdation);

module.exports = router;