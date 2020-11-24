const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdminNewUser = new Schema(
    {
        accountNumber : {
            type : Number,
            required : true,
            trim : true,
            unique : true,


        },
        walletAccountNumber: {
            type : String,
            required : true,
            trim : true,
            unique : true,
        },
        emailId : {
            type : String,
            required : true,
            unique : true,
        },
        firstName : {
            type : String,
            required : true,

        },
        lastName : {
            type : String,
            required : true,

        },
        bankName : {
            type : String,
            trim : true,
            

        },
        address : {
            type : String,
            trim : true,
        },
        tfnNumber : {
            type : Number,
            required : true,
            trim : true,
        },
        phoneNumber : {
            type : Number,
            required : true,
            trim : true,
        },
        openingBalance : {
            type : Number,
        },

    },
);

module.exports = mongoose.model("AdminNewUser", AdminNewUser);

