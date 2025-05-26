const User = require("../models/User");

const findUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    // TODO: handle error
    throw Error("User not found! If this error persists, please contact support");
  }
  return user;
}

module.exports = { findUserById };