const User = require("../models/User");
const { createError } = require("../utils/errors");

const getUser = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select("-password");
    if(!user) {
      throw createError("User not found", 404);
    }

    res.status(200).json({
      data: user
    })
  } catch (error) {
    return next(error);
  }
}

module.exports = { getUser };