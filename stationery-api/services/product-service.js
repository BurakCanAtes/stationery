const Book = require("../models/Book");
const Stationery = require("../models/Stationery");
const Toy = require("../models/Toy");
const Product = require("../models/Product");
const { PRODUCT_TYPES } = require("../config/product-config");
const { createError } = require("../utils/errors");
const { isValidMongooseId, applyPatch } = require("../utils/shared-utils");
const { findCategoryById } = require("../utils/category-utils");
const { findProductById } = require("../utils/product-utils");
const { filterFields } = require("../utils/validation");
const { productFields } = require("../config/requests-config");

const createProductBaseOnCategory = (productData, categoryName) => {
  const type = categoryName.trim().toLowerCase();
  switch (type) {
    case PRODUCT_TYPES.BOOK.toLowerCase():
      return new Book({ ...productData, productType: PRODUCT_TYPES.BOOK });
    case PRODUCT_TYPES.STATIONERY.toLowerCase():
      return new Stationery({ ...productData, productType: PRODUCT_TYPES.STATIONERY, })
    case PRODUCT_TYPES.TOY.toLowerCase():
      return new Toy({ ...productData, productType: PRODUCT_TYPES.TOY });
    default:
      throw createError(`Unsupported product type: ${categoryName}`, 400);
  }
};

const changeProductCategory = async (categoryId, updateData, productId) => {
  if (!isValidMongooseId(categoryId)) {
    throw createError("Invalid category ID", 400);
  }

  const category = await findCategoryById(categoryId);

  const newProduct = createProductBaseOnCategory(updateData, category.name);

  const { _id, ...productData } = newProduct.toObject();

  await Product.replaceOne({ _id: productId }, productData, {
    overwriteDiscriminatorKey: true,
    runValidators: true,
  });

  const populate = { path: "category", select: "_id name" };
  const updatedProduct = await findProductById(productId, populate);
  return updatedProduct;
}

const updateExistingProduct = async (productId, requestBody) => {
  const { category: categoryId } = requestBody;
  const { set, unset } = filterFields(requestBody, productFields);

  const product = await findProductById(productId);

  if (
    categoryId &&
    categoryId !== product.category.toString()
  ) {
    const updatedProduct = await changeProductCategory(categoryId, set, productId);
    return updatedProduct;
  }

  const patchedProduct = applyPatch(product, set, unset);
  await patchedProduct.save();

  const populate = { path: "category", select: "_id name" };
  const updatedProduct = await Product.findById(productId).populate(populate);
  return updatedProduct;
}

module.exports = { createProductBaseOnCategory, updateExistingProduct };