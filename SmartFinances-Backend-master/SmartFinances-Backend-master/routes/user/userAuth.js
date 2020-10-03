var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const {
	signout,
	signup,
	signin,
	isSignedIn,
} = require("../../controllers/user/userAuth");

router.post(
	"/signup",
	//using express validator to validate in routes
	[
		check("firstName")
			.isLength({ min: 3 })
			.withMessage("first name should be at least 3 charecters"),
		check("lastName")
			.isLength({ min: 1 })
			.withMessage("last name should be at least 3 charecters"),	
		check("emailId").isEmail().withMessage("email is required"),
		check("password")
			.isLength({ min: 3 })
			.withMessage("password should be atleast 3 charecters"),
		check("role")
			.isIn(["admin", "user"])
			.withMessage("Role should be either admin or user"),
	],
	signup,
);

router.post(
	"/signin",
	//using express validator to validate in routes
	[
		check("email").isEmail().withMessage("email is required"),
		check("password")
			.isLength({ min: 1 })
			.withMessage("password field is required"),
		check("role")
			.isIn(["admin", "user"])
			.withMessage("Role should be either admin or user"),
	],
	signin,
);

router.get("/signout", signout);
module.exports = router;
