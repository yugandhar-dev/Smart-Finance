const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User, securePassword } = require('../../models/user');
const newUser = require("../../controllers/admin/createNewUser");

const { JWT_SECRET } = process.env;

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  // Saving user to DB
  newUser.CreateUser(req,res);
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  const { email, password, role } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = await User.findOne({ email, role }).exec();
  if (!user) {
    return res.status(400).json({
      error: 'User email does not exist',
    });
  }

// limiting the unsuccessful login attempts
if(user.loginAttemptCount > 3) {
  try {
		await User
			.updateOne(
				{ email: email },
				{
					password : securePassword('12345'),
				}
			)
			.exec();
	} catch (err) {
		return res.status(400).json({
			error: "Error updating password",
		});
	}
  return res.status(401).json({ error: 'Too many attempts, reach admin for further verification'}); 
}
if(!password || !user.authenticate(password)) {
  user.loginAttemptCount ++;
  await user.save();
  return res.status(401).json({error: 'Wrong password! Try again'});
}
// Reset the user count to zero as soon as the user login
  user.loginAttemptCount = 0;
  await user.save();

  // Create token
  const expireDate = new Date(Date.now() + 150 * 60 * 1000);
  const tokenContent = {
    _id: user._id,
    type: user.role,
    iat: Date.now(),
    exp: expireDate.getTime(),
  };
  const token = jwt.sign(tokenContent, JWT_SECRET);

  // send response to frontend
  return res.json({
    token,
    user: {
      email,
      role,
      _id: user._id,
      name: user.name,
    },
  });
};

exports.signout = (req, res) => res.json({
  message: 'User Signout',
});
