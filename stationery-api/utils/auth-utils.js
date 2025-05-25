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

const isInvalidBody = (data, fields) => {
  return !data || !hasAllFields(data, fields);
};

module.exports = { isInvalidBody, createToken };
