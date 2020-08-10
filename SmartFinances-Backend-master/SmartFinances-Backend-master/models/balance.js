const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Balance = new Schema(
    {
        accountNumber : {
            type : Number,
            required : true,
            trim : true,  
        },
        walletAccountNumber : {
            type : Number,
            required : true,
            trim : true,  
        },
        accBalance : {
            type : Number,
            required : true,
            trim : true,
            
        },
        walletAccBalance : {
            type : String,
            required : true,
            trim : true,
            
        },
         lowRiskFund : {
            type : Number,
            trim : true,
        },
         mediumRiskFund : {
             type : Number,
             trim : true,
         },
         highRiskFund : {
             type : Number,
             trim : true,
         },
         totalfunds : {
             type : Number,
             trim : true,
         }
    },
);


module.exports = mongoose.model("Balance", Balance);