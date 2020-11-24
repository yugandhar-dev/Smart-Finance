const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Balance = new Schema({
	accountNumber: {
		type: Number,
		required: true,
		trim: true,
	},
	walletAccountNumber: {
		type: String,
		required: true,
		trim: true,
	},
	accountBalance: {
		type: Number,
		required: true,
		trim: true,
	},
	walletAccountBalance: {
		type: Number,
		required: true,
		trim: true,
	},
	lowRiskFund: {
		type: Number,
		trim: true,
	},
	exchangeTradedFund: {
		type: Number,
		trim: true,
	},
	savingScheme: {
		type: Number,
		trim: true,
	},
	totalfunds: {
		type: Number,
		trim: true,
	},
});

module.exports = mongoose.model("Balance", Balance);
