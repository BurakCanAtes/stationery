const User = require("../models/User");
const { addressFields } = require("../config/requests-config");
const { sortByDefault, findAddressById } = require("../utils/address-utils");
const { filterFields, MAX_ADDRESS_NUMBER } = require("../utils/validation");
const { createError } = require("../utils/errors");
const { findUserById, buildNestedUpdatePayload, throwIfPatchEmpty } = require("../utils/shared-utils");

const createNewAddress = async (userId, body) => {
  const user = await findUserById(userId);

  if (user.addresses.length >= MAX_ADDRESS_NUMBER) {
    throw createError(`You can't add more than ${MAX_ADDRESS_NUMBER} addresses., 400`);
  }

  const { isDefault } = body;

  let addresses = user.addresses;

  const { set } = filterFields(body, addressFields);

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

const isDefaultPromotion = (currentAddress, incomingSet) => {
  return (
    !currentAddress.isDefault &&
    Object.prototype.hasOwnProperty.call(incomingSet, "isDefault") &&
    incomingSet.isDefault === true
  )
}

const setAddressAsDefault = (addresses, addressId, set, unset) => {
  const newAddresses = addresses.map((ad) => {
    if (ad._id.equals(addressId)) {
      return {
        ...ad.toObject(),
        ...set,
        ...Object.fromEntries(
          Object.keys(unset).map((key) => [key, undefined])
        ),
        isDefault: true,
      };
    }
    return { ...ad.toObject(), isDefault: false };
  });

  return newAddresses;
}

const updateExistingAddress = async (userId, addressId, body) => {
  const user = await findUserById(userId);
  const address = findAddressById(user.addresses, addressId);
  const { set, unset } = filterFields(body, addressFields);

  const promoteToDefault = isDefaultPromotion(address, set);

  if (address.isDefault && set.isDefault === false) {
    delete set.isDefault;
  }

  throwIfPatchEmpty(set, unset);

  if (promoteToDefault) {
    const newAddresses = setAddressAsDefault(user.addresses, addressId, set, unset);

    user.addresses = sortByDefault(newAddresses);
    await user.save();

    return {
      updatedAddress: user.addresses.find((ad) => ad._id.equals(addressId)),
      addresses: user.addresses,
    };
  }

  const updatePayload = buildNestedUpdatePayload("addresses", set, unset);

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, "addresses._id": addressId },
    updatePayload,
    { new: true, runValidators: true }
  ).select("addresses");

  return {
    updatedAddress: updatedUser.addresses.find((ad) => ad._id.equals(addressId)),
    addresses: updatedUser.addresses,
  };
}

module.exports = { createNewAddress, updateExistingAddress };