var express = require("express");
var router = express.Router();

   const { thirdpartyapi } = require("../../controllers/thirdparty/thirdPartyapi");

 router.get("/thirdparty/thirdPartyapi/",  thirdpartyapi);

 router.post("/thirdparty/thirdPartyapi/",  thirdpartyapi);
 
   module.exports = router; 

   