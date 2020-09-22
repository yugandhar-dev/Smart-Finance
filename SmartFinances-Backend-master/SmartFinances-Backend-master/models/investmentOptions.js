const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InvestmentOptionDetails = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  investmentType: {
    type: String,
    required: true,
    trim: true
  },
  pricePerUnit: {
    type: Number,
    required: true
  },
  percentageOfReturns: {
    type: Number
   
  }
});

module.exports = mongoose.model(
  "InvestmentOptionDetails",
  InvestmentOptionDetails
);
