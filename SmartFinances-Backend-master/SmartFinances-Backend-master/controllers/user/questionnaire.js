const question = require("../../models/questionnaire");


exports.Questionnaire = (req, res) =>{
  const questions = new question(req.body)
  questions.save((err,questions)=> {
    if(err){
      return res.status(400).json({
        error:"Not able to store the answer"
      })
    }
    res.json({questions})
  })
}
