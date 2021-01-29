const Profile = require("../../models/usersignup");

exports.profileSettings = async(req, res) => {
     const useremail = req.body.email;

    let phone;
    let address;
    let city;
    let state;
    let postalCode;
    let university;


    try {
		userProfile = await Profile
			.findOne({ email: useremail })
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
    
   if(req.body.phone == null){
    phone=userProfile.phone;

   }else {
    phone=req.body.phone;
   }

   if(req.body.address == null){
    address=userProfile.address;

   }else {
    address=req.body.address;
   }


   if(req.body.city == null){
    city=userProfile.city;

   }else {
    city=req.body.city;
   }


   if(req.body.state == null){
    state=userProfile.state;

   }else {
    state=req.body.state;
   }

   if(req.body.postalCode == null){
    postalCode=userProfile.postalCode;

   }else {
    postalCode=req.body.postalCode;
   }

   if(req.body.university == null){
    university=userProfile.university;

   }else {
    university=req.body.university;
   }
    
    try {
		await Profile
			.updateOne(
                { email: useremail },
                {
                    phone: phone,
                    address: address,
                    city: city,
                    state: state,
                    postalCode: postalCode,
                    university: university,
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

 