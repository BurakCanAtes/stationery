const User = require("../models/User");
const { createError, createValidationError } = require("../utils/errors");
const { createNewAddress } = require("../services/user-address-service");

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

const addNewAddress = async (req, res, next) => {
  try {
    const { userId } = req;

    const { address, newAddresses } = await createNewAddress(userId, req.body);

    res.status(201).json({
      address,
      addresses: newAddresses,
    });
  } catch (error) {
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
}

module.exports = { getAllAddresses, addNewAddress };