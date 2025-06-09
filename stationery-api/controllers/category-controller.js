const Category = require("../models/Category");
const { categoryFields } = require("../config/requests-config");
const { isInvalidBody } = require("../utils/auth-utils");
const { createError, createValidationError } = require("../utils/errors");

const addNewCategory = async (req, res, next) => {
  try {
    if (isInvalidBody(req.body, categoryFields)) {
      throw createError("Request body is invalid or modified", 400);
    }

    const { name } = req.body;

    const category = new Category({ name });
    await category.save();

    res.status(201).json({ data: category });
  } catch (error) {
    if (error.code === 11000) {
      return next(createError("Category name already exists", 409));
    }
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
};

module.exports = { addNewCategory };