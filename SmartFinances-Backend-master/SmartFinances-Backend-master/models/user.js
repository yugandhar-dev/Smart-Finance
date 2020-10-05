const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
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
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    accountNumber: {
      type: Number,
      required: true,
      trim: true,
      unique: true
    },
    walletAccountNumber: {
      type: String,
      required: true,
      trim: true
    },
    activationStatus: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  }
};

const securePassword = password => {
  const salt = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = {
  User: mongoose.model("User", userSchema),
  securePassword
};
