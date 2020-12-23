const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const Usersignup = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    DOB: {
        type: Date,
        required: false,
        maxlength: 32,
        trim: true
      },
    PhoneNumber: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    Gender: {
      type: String,
      required: true
    },
    StreetAdrress: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true
    },
    City: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    State: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    Postalcode: {
        type: Number,
        required: true,
        trim: true
    },
    isEnrolled: {
      type: String,
      required: true,
    },
    University: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true
    },
    commuteToUniversity: {
      type: String,
      required: true,
    },
    isWorking: {
      type: String,
      required: true,
    },
    Industry: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true
    },
    officeLocation: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true
    },
    commuteToOffice: {
      type: String,
      required: true,
    },
    bankName : {
      type : String,
      trim : true,
  },
   accountNumber : {
      type : Number,
      required : true,
      trim : true,
      unique : true,
  },
   tfnNumber : {
      type : Number,
      required : true,
      trim : true,
  },
   openingBalance : {
      type : Number,
},
  walletAccountNumber: {
     type : String,
     required : true,
     trim : true,
     unique : true,
   },
   isverified: {
      type: String,
      required: true,
  },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Usersignup", Usersignup);
