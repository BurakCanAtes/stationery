const { findCategoryById, throwDuplicateCategory } = require("../utils/category-utils");

const updateCategory = async (id, name) => {
  const category = await findCategoryById(id);

  await throwDuplicateCategory(name, id);

  category.name = name;
  await category.save();

  return category;
}

module.exports = { updateCategory };