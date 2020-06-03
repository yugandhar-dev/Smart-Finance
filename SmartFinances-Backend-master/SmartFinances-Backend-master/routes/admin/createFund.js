



var express = require("express");
var router = express.Router();

const {
    CreateFund,
} = require("../../controllers/admin/createFund");


router.post(
    "/admin/createFund",


    CreateFund
    );

module.exports = router;





