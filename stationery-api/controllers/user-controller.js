const User = require("../models/User");
const { updateUserById } = require("../services/user-service");
const { createError, createValidationError } = require("../utils/errors");

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

// TODO: handle image upload and image link for avatar
const updateUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await updateUserById(userId, req.body);

    res.status(200).json({
      data: user
    })
  } catch (error) {
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw createError("User not found! If this error persists, please contact support", 404);
    }

    // TODO: Delete related data (cart, orders, reviews, etc.)

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getUser, updateUser, deleteUser };