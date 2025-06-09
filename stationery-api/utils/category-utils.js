const Category = require("../models/Category");
const { createError } = require("./errors");

const findCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw createError("Category not found!", 404);
  }
  return category;
}

const throwDuplicateCategory = async (name, id) => {
  const existingCategory = await Category.findOne({ name: name.trim().toLowerCase() });
  if (existingCategory && existingCategory._id.toString() !== id) {
    throw createError("Category name already exists", 409);
  }
}

module.exports = { findCategoryById, throwDuplicateCategory };