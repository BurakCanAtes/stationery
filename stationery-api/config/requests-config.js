const registerFields = ["firstName", "lastName", "email", "password"];
const loginFields = ["email", "password"];
const updateUserFields = ["firstName", "lastName", "avatar"];
const addressFields = ["label", "fullName", "phone", "street", "city", "postalCode", "country", "isDefault"];
const categoryFields = ["name"];

module.exports = {
  registerFields,
  loginFields,
  updateUserFields,
  addressFields,
  categoryFields
};
