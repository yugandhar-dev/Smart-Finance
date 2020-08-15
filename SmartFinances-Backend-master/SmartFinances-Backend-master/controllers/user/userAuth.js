const { User, securePassword } = require("../../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { JWT_SECRET } = process.env;

exports.signup = (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty())
		return res.status(422).json({
			error: errors.array()[0].msg,
		});

	//Saving user to DB
	const user = new User({
		email: req.body.email,
		password: securePassword(req.body.password, req.body.name),
		name: req.body.name,
		role: req.body.role,
	});

	user.save((err, user) => {
		if (err)
			return res.status(400).json({
				error: "NOT able to save user in DB",
			});

		res.json({
			name: user.name,
			email: user.email,
			id: user._id,
		});
	});
};

exports.signin = (req, res) => {
	const errors = validationResult(req);
	const { email, password, role } = req.body;

	if (!errors.isEmpty())
		return res.status(422).json({
			error: errors.array()[0].msg,
		});

	User.findOne({ email, role }, (err, user) => {
		if (err || !user)
			return res.status(400).json({
				error: "User email does not exist",
			});

		if (!user.authenticate(password))
			return res.status(401).json({
				error: " Email & password do not match",
			});

		//Create token
		const expireDate = new Date(Date.now() + 15 * 60 * 1000);
		const tokenContent = {
			_id: user._id,
			type: user.role,
			iat: Date.now(),
			exp: expireDate.getTime(),
		};
		const token = jwt.sign(tokenContent, JWT_SECRET);

		//send response to frontend
		const { _id, name, email, role } = user;
		return res.json({ token, user: { _id, name, email, role } });
	});
};

exports.signout = (req, res) =>
	res.json({
		message: "User Signout",
	});
