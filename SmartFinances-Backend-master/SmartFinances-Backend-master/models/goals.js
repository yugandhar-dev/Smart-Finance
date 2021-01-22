const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Goals = new Schema({
  Aim: {
    type: String,
    required: true,
    trim: true,
  },
  Description: {
    type: String,
    required: true,
    trim: true,
  },
  Amount: {
    type: Number,
    required: true,
    trim: true,
  },
  Due: {
    type: Date,
    trim: true,
  },
});

module.exports = mongoose.model('Goals', Goals);
