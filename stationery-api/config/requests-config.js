const registerFields = ["firstName", "lastName", "email", "password"];
const loginFields = ["email", "password"];
const updateUserFields = ["firstName", "lastName", "avatar"];
const addressFields = ["label", "fullName", "phone", "street", "city", "postalCode", "country", "isDefault"];
const categoryFields = ["name"];
const productFields = ["name", "category", "price", "images", "stock", "color", "brand", "author", "publisher", "pages", "ageRange"];
const cartItemFields = ["product", "quantity"];

module.exports = {
  registerFields,
  loginFields,
  updateUserFields,
  addressFields,
  categoryFields,
  productFields,
  cartItemFields
};
