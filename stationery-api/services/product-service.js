const Book = require("../models/Book");
const Stationery = require("../models/Stationery");
const Toy = require("../models/Toy");
const { PRODUCT_TYPES } = require("../config/product-config");
const { createError } = require("../utils/errors");

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

module.exports = { createProductBaseOnCategory };