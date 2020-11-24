var express = require("express");
var router = express.Router();

const { GetUserRequests, ApproveUser } = require("../../controllers/admin/approveUser");

//Route to get all User requests
router.get("/admin/getuserrequests", GetUserRequests);

//Route to approve selected User
router.delete("/admin/approveuser", ApproveUser);

module.exports = router;

