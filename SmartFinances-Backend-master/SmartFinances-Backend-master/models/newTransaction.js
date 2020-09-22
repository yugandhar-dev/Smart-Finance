const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewTransaction = new Schema({
  walletAccountNumber: {
    type: String,
    required: true,
    trim: true,
  },
  category:{
    type: String,
    required: true,
    trim: true,

  },
  subcategory:{
    type: String,
    trim: true,

  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  roundedAmount: {
    type: Number,
    //required: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    //required: true,
    trim: true,
    maxlength: 200,
  },
  // fund: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
});

module.exports = mongoose.model("NewTransaction", NewTransaction);
