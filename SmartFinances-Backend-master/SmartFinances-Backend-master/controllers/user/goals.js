const userGoal = require("../../models/goals");


exports.UserGoals = (req, res) =>{
  const userGoals = new userGoal(req.body)
  userGoals.save((err,userGoals)=> {
    if(err){
      return res.status(400).json({
        error:"Not able to Create User"
      })
    }
    res.json({userGoals})
  })
}
