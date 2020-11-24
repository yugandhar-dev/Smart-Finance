const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

exports.authenticate = async (req, res, next) => {
  // The path is an authentication one
  if (
    req.path.startsWith("/api/signin") ||
    req.path.startsWith("/api/signup") ||
    req.path.startsWith("/api//admin/getPhoneNumber")
  ) {
    return next();
  }

  const authTokenHeader = req.header("Authorization");
  if (!authTokenHeader) {
    return res.status(401).json({ error: "Missing authentication token" });
  }

  const [authType, authToken] = authTokenHeader.split(" ", 2);
  if (authType !== "Bearer") {
    return res
      .status(401)
      .json({ error: "This authorization type is not supported." });
  }

  if (!authToken) {
    return res
      .status(401)
      .json({ error: "The authorization token has an invalid format." });
  }

  try {
    const data = jwt.verify(authToken, JWT_SECRET);
    req.user = data;
  } catch (err) {
    return res.status(401).json({ error: "The given token is invalid" });
  }

  if (Date.now() > req.user.exp) {
    return res.status(401).json({ error: "The token has expired" });
  }

  return next();
};
