const usertran = require("../../models/userBanktransaction");


exports.userBanktran = (req, res) =>{
  const userbank = new usertran(req.body)
  userbank.save((err,userbank)=> {
    if(err){s
      return res.status(400).json({
        error:"Not able to Create transaction"
      })
    }
    res.json({userbank})
  })
}
