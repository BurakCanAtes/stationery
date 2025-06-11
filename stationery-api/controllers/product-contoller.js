const Product = require("../models/Product");
const { productFields } = require("../config/requests-config");
const { DEFAULT_PAGE, PAGE_SIZE, MAX_PAGE_SIZE } = require("../config/product-config");
const { createProductBaseOnCategory } = require("../services/product-service");
const { createError, createValidationError } = require("../utils/errors");
const { filterFields } = require("../utils/validation");
const { findCategoryById } = require("../utils/category-utils");
const { buildFilterQuery, buildSortQuery, findProductById } = require("../utils/product-utils");

const addNewProduct = async (req, res, next) => {
  try {
    const { category: categoryId } = req.body;
    if (!categoryId) {
      throw createError("Category is required", 400);
    }

    const category = await findCategoryById(categoryId);

    const { set } = filterFields(req.body, productFields);

    const newProduct = createProductBaseOnCategory(set, category.name);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const query = buildFilterQuery(req);
    const sortOption = buildSortQuery(req);

    const pageNumber = Math.max(1, parseInt(req.query.page, 10) || DEFAULT_PAGE);
    const pageSize = Math.min(
      Math.max(1, parseInt(req.query.limit, 10) || PAGE_SIZE),
      MAX_PAGE_SIZE
    );
    const skip = (pageNumber - 1) * pageSize;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);
    const isLastPage = pageNumber >= totalPages;

    res.status(200).json({
      page: pageNumber,
      totalPages,
      totalProducts,
      pageSize,
      isLastPage,
      data: products,
    });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const populate = {
      path: "category",
      select: "_id name"
    }
    const product = await findProductById(id, populate);

    res.status(200).json(product);
  } catch (error) {
    if (error.name === "CastError" || error.name === "BSONTypeError") {
      return next(createError("Invalid product ID", 400));
    }
    return next(error);
  }
};

module.exports = { addNewProduct, getProducts, getProductById };