const { User, securePassword } = require('../../models/user');

exports.ChangePassword = async (req, res) => {
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    let useremailid;


    try {
		useremailid = await User
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
		await User
			.updateOne(
				{ email: useremail },
				{
					password : securePassword(userpassword),
				}
			)
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: "Error updating password",
		});
    }
    res.status(200).json({
		Success: "User Password is updated",
	});

}
	