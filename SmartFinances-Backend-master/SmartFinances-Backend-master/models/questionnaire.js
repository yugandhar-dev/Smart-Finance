const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionnaire = new Schema({
  Answer1: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },
  Answer2: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },
  Answer3: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },
  Answer4: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },
  Answer5: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },
  Answer6: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },
  Answer7: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },
  Answer8: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },
  Answer9: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },
  Answer10: {
    type: String,
    required: true,
    maxlength: 10000,
    trim: true,
  },

});

module.exports = mongoose.model('questionnaire', questionnaire);
