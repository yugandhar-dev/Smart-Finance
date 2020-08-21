const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Investment = new Schema({
  accountNumber: {
    type: Number,
    required: true,
    trim: true
  },
  investmentType: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  numberOfUnits: {
    type: Number,
    required: true
  },
  amountInvested: {
    type: Number,
    required: true
  },
  pricePerUnit: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Investment", Investment);
