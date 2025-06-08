const registerFields = ["firstName", "lastName", "email", "password"];
const loginFields = ["email", "password"];
const updateUserFields = ["firstName", "lastName", "avatar"];
const newAddressFields = ["label", "fullName", "phone", "street", "city", "postalCode", "country", "isDefault"];

module.exports = {
  registerFields,
  loginFields,
  updateUserFields,
  newAddressFields,
};