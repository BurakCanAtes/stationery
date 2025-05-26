const jwt = require("jsonwebtoken");

const { hasAllFields } = require("./validation");
const { JWT_SECRET, JWT_MAX_AGE } = require("../config/jwt-config");

const createToken = (data) => {
  try {
    return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_MAX_AGE });
  } catch (error) {
    throw new Error("Failed to create token");
  }
};

const decodeToken = (token) => {
  // TODO: handle errors globally
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw Error("Token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw Error("Invalid token");
    }
    throw Error("Failed to decode token");
  }
};

const isInvalidBody = (data, fields) => {
  return !data || !hasAllFields(data, fields);
};

module.exports = { isInvalidBody, createToken, decodeToken };
