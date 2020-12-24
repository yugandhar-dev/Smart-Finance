const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const Usersignup = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: false,
      maxlength: 32,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    postalCode: {
      type: Number,
      required: true,
      trim: true,
    },
    isEnrolled: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    commuteToUniversity: {
      type: String,
      required: true,
    },
    isWorking: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    officeLocation: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    commuteToOffice: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    tfnNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    openingBalance: {
      type: Number,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usersignup', Usersignup);
