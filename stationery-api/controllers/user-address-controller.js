const User = require("../models/User");
const { createError } = require("../utils/errors");

const getAllAddresses = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);
    if(!user) {
      throw createError("User not found! If this error persists, please contact support", 404);
    }

    res.status(200).json({
      addresses: user.addresses
    })
  } catch (error) {
    return next(error);
  }
}

module.exports = { getAllAddresses };