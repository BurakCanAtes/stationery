const { createValidationError } = require("../utils/errors");
const { createNewAddress, updateExistingAddress } = require("../services/user-address-service");
const { findUserById } = require("../utils/shared-utils");

const getAllAddresses = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = await findUserById(userId);

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

const updateAddress = async (req, res, next) => {
  try {
    const { userId } = req;
    const { addressId } = req.params;

    const { updatedAddress, addresses } = await updateExistingAddress(userId, addressId, req.body);

    res.status(200).json({
      address: updatedAddress,
      addresses,
    });
  } catch (error) {
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
}

module.exports = { getAllAddresses, addNewAddress, updateAddress };