const ThirdpartyUser = require("../../models/createNewUser");
const SHA256 = require('crypto-js/sha256')

exports.thirdpartyapi = (req, res) => {
  
  const hash=SHA256(JSON.stringify(this.firstName)).toString();
    console.log('hash value of users: ' + hash);
  
 ThirdpartyUser.updateMany({},{$set: {"address": hash}}).exec((err, doc) => {
 
  var reqhash = req.body.address;

   if (err || doc.length==0) {
      return res.status(400).json({
       error: "Could not update hash value",
     });
   }

    ThirdpartyUser.find({address: reqhash}).exec((err, doc) => {
      if (err || doc.length==0) {
        return res.status(400).json({
         error: "Could not get user with this hash value",
       });
     }
   res.json(doc);
   } );
 }
 );
  };