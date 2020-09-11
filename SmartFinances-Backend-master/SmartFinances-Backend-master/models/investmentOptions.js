const mongoose = require('mongoose');

const { Schema } = mongoose;

const InvestmentOptionDetails = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  companyStockSymbol: {
    type: String,
    required: false,
    set: (k) => k.toUpperCase(),
  },
  investmentType: {
    type: String,
    required: true,
    trim: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  percentageOfReturns: {
    type: Number,
    // required: true
  },
  lastUpdate: {
    type: String,
  },
});

module.exports = mongoose.model(
  'InvestmentOptionDetails',
  InvestmentOptionDetails,
);
