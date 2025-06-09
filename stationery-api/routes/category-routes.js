const { Router } = require("express");

const categoryController = require("../controllers/category-controller");
const isAdminUser = require("../middlewares/permission-middleware");

const router = Router();

router.get("", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("", isAdminUser, categoryController.addNewCategory);
router.patch("/:id", isAdminUser, categoryController.updateCategoryById);

// TODO: optional => delete category

module.exports = router;