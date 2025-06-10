const Category = require("../models/Category");
const { categoryFields } = require("../config/requests-config");
const { updateCategory } = require("../services/category-service");
const { findCategoryById } = require("../utils/category-utils");
const { isInvalidBody } = require("../utils/auth-utils");
const { createError, createValidationError } = require("../utils/errors");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });

    res.status(200).json({ total: categories.length , data: categories });
  } catch (error) {
    return next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await findCategoryById(id);

    res.status(200).json(category);
  } catch (error) {
    if (error.name === "CastError" || error.name === "BSONTypeError") {
      return next(createError("Invalid category ID", 400));
    }
    return next(error);
  }
};

const addNewCategory = async (req, res, next) => {
  try {
    if (isInvalidBody(req.body, categoryFields)) {
      throw createError("Request body is invalid or modified", 400);
    }

    const { name } = req.body;

    const category = new Category({ name });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return next(createError("Category name already exists", 409));
    }
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
};

const updateCategoryById = async (req, res, next) => {
  try {
    if (isInvalidBody(req.body, categoryFields)) {
      throw createError("Request body is invalid or modified", 400);
    }

    const { id } = req.params;
    const { name } = req.body;

    const category = await updateCategory(id, name);

    res.status(200).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return next(createError("Category name already exists", 409));
    }
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
};

module.exports = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
};