const Userupdation = require("../../models/createNewUser");

exports.Adminusrupdation = async(req, res) => {
     const useraccountNumber = req.body.useraccountNumber;

    let firstname;
    let lastname;
    let address;
    let phonenumber;

    try {
		userProfile = await Userupdation
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
    
   if(req.body.userfirstName == null){
    firstname=userProfile.firstName;

   }else {
    firstname=req.body.userfirstName;
   }

   if(req.body.userlastName == null){
    lastname=userProfile.lastName;

   }else {
    lastname=req.body.userlastName;
   }


   if(req.body.useraddress == null){
    address=userProfile.address;

   }else {
    address=req.body.useraddress;
   }


   if(req.body.userphoneNumber == null){
    phonenumber=userProfile.phoneNumber;

   }else {
    phonenumber=req.body.userphoneNumber;
   }
    
    try {
		await Userupdation
			.updateOne(
                { accountNumber: useraccountNumber },
                {
                    emailId: userProfile.emailId,
                    firstName: firstname,
                    lastName: lastname,
                    address: address,
                    tfnNumber: userProfile.tfnNumber,
                    phoneNumber: phonenumber,
                    openingBalance: userProfile.openingBalance,
                }
			)
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: "Error updating User",
		});
    }
    
    res.status(200).json({
		Success: "User is updated",
	});


}

 