const adminscreate = require("../../models/admin");


exports.AdminCreateion = (req, res) =>{
  const adminsNew = new adminscreate(req.body)
  adminsNew.save((err,adminsNew)=> {
    if(err){
      return res.status(400).json({
        error:"Not able to Create User"
      })
    }
    res.json({adminsNew})
  })
}
