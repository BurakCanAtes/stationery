const User = require("../models/User");
const { newAddressFields } = require("../config/requests-config");
const { sortByDefault } = require("../utils/address-utils");
const { filterFields, MAX_ADDRESS_NUMBER } = require("../utils/validation");
const { createError } = require("../utils/errors");

const createNewAddress = async (userId, body) => {
  const user = await User.findById(userId);
  if(!user) {
    throw createError("User not found! If this error persists, please contact support", 404);
  }

  if (user.addresses.length >= MAX_ADDRESS_NUMBER) {
    throw createError(`You can't add more than ${MAX_ADDRESS_NUMBER} addresses., 400`);
  }

  const { isDefault } = body;

  let addresses = user.addresses;

  const { set } = filterFields(body, newAddressFields);

  if (user.addresses.length === 0) {
    set.isDefault = true;
  } else {
    if (isDefault) {
      addresses = user.addresses.map((address) => {
        address.isDefault = false;
        return address;
      });
    }
  }

  const newAddresses = sortByDefault([set, ...addresses]);

  user.addresses = newAddresses;
  await user.save();

  return { address: set, newAddresses: user.addresses }
}

module.exports = { createNewAddress };