const usersBalance = require("../../models/balance");


exports.UserGetBalance = (req, res) =>{
  const userBalance = new usersBalance(req.body)
  userBalance.save((err,userBalance)=> {
    if(err){
      return res.status(400).json({
        error:"Not able to Create Fund"
      })
    }
    res.json({userBalance})
  })
}
