const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserBanktransactions = new Schema({
    date: {
		type: String,
		required: true,
		trim: true,
    },
    category: {
		type: String,
		required: true,
		trim: true,
	},
	MerchantName: {
		type: String,
		required: true,
		trim: true,
	},
	outflow: {
		type: Number,
		trim: true,
	},
	inflow: {
		type: Number,
		trim: true,
	},
	
});

module.exports = mongoose.model("UserBanktransactions", UserBanktransactions);
