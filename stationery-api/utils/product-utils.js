const Product = require("../models/Product");
const { createError } = require("./errors");

const buildFilterQuery = (req) => {
  const { category, search, minPrice, maxPrice, inStock } = req.query;
  const query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search.trim(), $options: "i" };
  }

  const minPriceNumber = Number(minPrice);
  const maxPriceNumber = Number(maxPrice);

  if (!isNaN(minPriceNumber) || !isNaN(maxPriceNumber)) {
    query.price = {};

    if (!isNaN(minPriceNumber)) {
      query.price.$gte = minPriceNumber;
    }

    if (!isNaN(maxPriceNumber)) {
      query.price.$lte = maxPriceNumber;
    }
  }

  if (inStock === "true") {
    query.stock = { $gt: 0 };
  }

  return query;
};

const buildSortQuery = (req) => {
  const { sort } = req.query;

  if (!sort) {
    return { createdAt: -1 };
  }

  const SORT_FIELDS = ["name", "price", "createdAt"];
  const isDescending = sort.startsWith("-");
  const field = isDescending ? sort.substring(1) : sort; // Remove "-" for clean field name

  if (!SORT_FIELDS.includes(field)) {
    return { createdAt: -1 };
  }

  return { [field]: isDescending ? -1 : 1 };
};

const findProductById = async (id, populate) => {
  const product = await Product.findById(id).populate(populate);
  if (!product) {
    throw createError("Product not found!", 404);
  }
  return product;
}

module.exports = { buildFilterQuery, buildSortQuery, findProductById };