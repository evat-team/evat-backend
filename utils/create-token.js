const jwt = require("jsonwebtoken");

const createToken = (user_data) => {
  return jwt.sign(user_data, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_DURATION,
  });
};

module.exports = createToken;
