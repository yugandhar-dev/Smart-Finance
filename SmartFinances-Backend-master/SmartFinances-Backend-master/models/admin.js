const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Admins = new Schema({
	FirstName: {
		type: String,
		required: true,
		trim: true,
	},
	LastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	phone: {
		type: String,
		required: true,
		trim: true,
    },
    address: {
		type: String,
		required: true,
		trim: true,
    },
    Password: {
		type: String,
		required: true,
		trim: true,
	},
});

module.exports = mongoose.model("Admins", Admins);
