const Category = require("../models/Category")

const findCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw createError("Category not found!", 404);
  }
  return category;
}

module.exports = { findCategoryById };