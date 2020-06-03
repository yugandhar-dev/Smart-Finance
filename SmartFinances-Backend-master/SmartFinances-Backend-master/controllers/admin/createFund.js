

const NewFund = require("../../models/createFund");


exports.CreateFund = (req, res) =>{
  const newFund = new NewFund(req.body)
  newFund.save((err,newFund)=> {
    if(err){
      return res.status(400).json({
        error:"Not able to Create Fund"
      })
    }
    res.json({newFund})
  })
}