const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const usersignup = new Schema(
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
    DOB: {
        type: Date,
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
    StreeetAdrress: {
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
    }
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("Usersignup", usersignup),
};
