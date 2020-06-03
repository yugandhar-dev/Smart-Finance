const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdminNewFund = new Schema(
    {
        fundId : {
            type : Number,
            required : true,
            trim : true,
            unique : true,
        },
        fundTitle : {
            type : String,
            required : true,
            trim : true,
            minlength : 2,

        },
        fundType : {
            type : String,
            required : true,
            
        },
        returnOfInvestment : {
            type : Number,
            required : true,
            
        },
        description : {
            type : String,
            required : true,
            trim : true,
            maxlength : 2000,

        },


    },
);

module.exports = mongoose.model("AdminNewFund", AdminNewFund);