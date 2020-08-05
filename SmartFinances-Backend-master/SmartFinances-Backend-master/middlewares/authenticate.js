const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

exports.authenticate = async(req, res, next) => {
  // The path is an authentication one
  if (req.path.startsWith('/api/signin/') || req.path.startsWith('/api/signup/')) {
    return next();
  }

  const authTokenHeader = req.header('Authorization');
  if (!authTokenHeader) {
    return res.status(401).json({ error: 'Missing authentication token' });
  }

  const [authType, authToken] = authTokenHeader.split(' ', 2);
  if (authType !== 'Bearer') {
    return res.status(401).json({ error: 'This authorization type is not supported.' });
  }

  if (!authToken) {
    return res.status(401).json({ error: 'The authorization token has an invalid format.' });
  }

  try {
    jwt.verify(authToken, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'The given token is invalid' });
  }

  return next();
}