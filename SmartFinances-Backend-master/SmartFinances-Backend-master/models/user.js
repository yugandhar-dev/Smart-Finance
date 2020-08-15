const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const crypto = require("crypto");

var userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true,
		},
		lastname: {
			type: String,
			required: false,
			maxlength: 32,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.methods = {
	authenticate: function (plainpassword) {
		console.log(securePassword(plainpassword,this.name))
		return securePassword(plainpassword, this.name) === this.password;
	},
};

const securePassword = (plainpassword, salt) => {
	return crypto.createHmac("sha256", salt).update(plainpassword).digest("hex");
};

module.exports = {
	User: mongoose.model("User", userSchema),
	securePassword: securePassword,
};
