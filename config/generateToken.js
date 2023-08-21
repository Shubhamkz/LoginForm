const jwt = require("jsonwebtoken");

const generateToken = (pass) => {
  return jwt.sign({ pass }, process.env.JWt_SECRET, { expiresIn: "1h" });
};

module.exports = generateToken;
