const user = require("../../models/user");
const { securePassword } = require('../../models/user');

exports.ChangePassword = async (req, res) => {
    const useremail = req.body.useremail;
    const userpasword = req.body.userpasword;
    let useremailid;


    try {
		useremailid = await user
			.findOne({ email: useremail })
            .exec();
	} catch (err) {
		return res.status(400).json({
			error: "User",
		});
    }
    
    if (!useremailid) {
		return res.status(400).json({
			error: "User email does not exist",
		});
    }
    
    try {
		await changePassword
			.updateOne(
				{ email: useremail },
				{
					password : securePassword(userpasword),
				}
			)
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: "Error updating password",
		});
	}

}
	