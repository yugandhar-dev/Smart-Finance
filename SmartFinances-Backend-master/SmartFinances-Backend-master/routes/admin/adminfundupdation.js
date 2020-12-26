var express = require("express");
var router = express.Router();

const {
    fundUpdation,
} = require("../../controllers/admin/adminfundupdation");

router.post("/admin/adminfundupdation", fundUpdation);

module.exports = router;