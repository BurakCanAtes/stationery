const Product = require("../models/Product");
const { productFields } = require("../config/requests-config");
const { createProductBaseOnCategory, updateExistingProduct } = require("../services/product-service");
const { createError, createValidationError } = require("../utils/errors");
const { filterFields } = require("../utils/validation");
const { findCategoryById } = require("../utils/category-utils");
const { buildFilterQuery, buildSortQuery, findProductById } = require("../utils/product-utils");
const { isValidMongooseId, createPagination } = require("../utils/shared-utils");

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

    const totalProducts = await Product.countDocuments(query);

    const { skip, pageNumber, totalPages, pageSize, isLastPage } =
      createPagination(req.query.page, req.query.limit, totalProducts);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize).populate({
        path: "category",
        select: "_id name"
      });

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

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidMongooseId(id)) {
      throw createError("Invalid product ID", 400);
    }

    const updatedProduct = await updateExistingProduct(id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw createError("Product not found", 404);
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addNewProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};