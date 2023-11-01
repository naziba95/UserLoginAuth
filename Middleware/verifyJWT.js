const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Invalid token or expired
    }

    req.user = {
      userId: decoded.UserInfo.userId,
      email: decoded.UserInfo.email,
    };

    next();
  });
};

module.exports = verifyJWT;
