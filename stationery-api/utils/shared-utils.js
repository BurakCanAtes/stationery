const User = require("../models/User");
const { createError } = require("./errors");

const findUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError("User not found! If this error persists, please contact support", 404);
  }
  return user;
}

module.exports = { findUserById };