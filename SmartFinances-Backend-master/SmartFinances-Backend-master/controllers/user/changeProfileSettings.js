const Profile = require("../../models/createNewUser");

exports.ChangeProfileSettings = async(req, res) => {
    const useraccountNumber = req.body.useraccountNumber;
    const userfirstName = req.body.userfirstName;
    const userlastName = req.body.userlastName;
    const useraddress = req.body.useraddress;
    const userphoneNumber = req.body.userphoneNumber;

    try {
		userProfile = await Profile
			.findOne({ accountNumber: useraccountNumber })
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: err,
		});
    }
    
    if (!userProfile) {
		return res.status(400).json({
			error: "Error fetching user details",
		});
    }
    
    try {
		await Profile
			.updateOne(
                { accountNumber: useraccountNumber },
                {
                    emailId: userProfile.emailId,
                    firstName: userfirstName,
                    lastName: userlastName,
                    address: useraddress,
                    tfnNumber: userProfile.tfnNumber,
                    phoneNumber: userphoneNumber,
                    openingBalance: userProfile.openingBalance,
                }
			)
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: "Error updating profile",
		});
    }
    
    res.status(200).json({
		Success: "User Profile is updated",
	});


}

 