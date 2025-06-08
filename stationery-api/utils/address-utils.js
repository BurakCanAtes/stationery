const { createError } = require("./errors");

const sortByDefault = (addresses) => (
  addresses.sort((a, b) => {
    return (b.isDefault === true) - (a.isDefault === true);
  })
);

const findAddressById = (addresses, addressId) => {
  const address = addresses.find((ad) => ad._id.equals(addressId));
  if (!address) {
    throw createError("Address not found", 404);
  }
  return address;
}

module.exports = { sortByDefault, findAddressById };