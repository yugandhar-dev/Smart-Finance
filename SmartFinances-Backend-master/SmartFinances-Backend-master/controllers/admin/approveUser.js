const user = require("../../models/user");
const userBalance = require("../../models/balance");
const userDetails = require("../../models/createNewUser");

exports.GetUserRequests = (req,res) => {
    user.User.find({activationStatus:"N"},(err,requests) => {
        if(err){
            return res.status(400).json({
                error: "Not able to fetch user requsts"
            });
        }
        return res.send(requests);
    });
    

};

exports.ApproveUser = async (req,res) => {
    if(req.body.activation == 0){
        try{
            await user.User.deleteOne({walletAccountNumber: req.body.walletAccountNumber}).exec();

        }catch(err){
            return res.status(400).json({
                error: "not able to delete details in User collection"
            });
        }
        try{
            await userDetails.deleteOne({walletAccountNumber: req.body.walletAccountNumber}).exec();
        }catch(err){
            return res.status(400).json({
                error: "not able to delte details in adminNewUser"
            });
        }

        try{
            await userBalance.deleteOne({walletAccountNumber: req.body.walletAccountNumber}).exec();
        }catch(err){
            return res.status(400).json({
                error: "not able to delte details in balance"
            });
        }

        return res.status(200).json({
            Success: "Rejected successfully and deleted details"
        });
        
    }else{
        try{
            user.User.updateOne({walletAccountNumber:req.body.walletAccountNumber}, {activationStatus: "Y", password:user.securePassword("smartfinance123")}).exec();
        }catch(err){
            return res.status(400).json({
                error: "Not able to approve request"
            });
        }
    
        return res.status(200).json({
            Success: "Request Approved"
        });
        
    }

    

};