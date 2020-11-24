var express = require("express");
var router = express.Router();

const { UploadReceipt } = require("../../controllers/user/uploadReceipt");

router.post("/user/uploadReceipt", UploadReceipt);

module.exports = router;
