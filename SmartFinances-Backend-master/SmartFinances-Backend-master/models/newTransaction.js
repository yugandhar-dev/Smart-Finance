const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewTransaction = new Schema({
  account: {
    type: Number,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  roundedAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  transactionType: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  fund: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("NewTransaction", NewTransaction);
