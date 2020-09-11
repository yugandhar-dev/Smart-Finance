const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserInvestments = new Schema({
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
	investmentType: {
		type: String,
		required: true,
		trim: true,
	},
	companyName: {
		type: String,
		required: true,
		trim: true,
	},
	numberOfUnits: {
		type: Number,
	},
	amountInvested: {
		type: Number,
		required: true,
	},
	pricePerUnit: {
		type: Number,
	},
	createdDate: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model("UserInvestments", UserInvestments);
