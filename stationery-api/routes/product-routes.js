const { Router } = require("express");

const productController = require("../controllers/product-controller");

const isAdminUser = require("../middlewares/permission-middleware");

const router = Router();

router.get("", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("", isAdminUser, productController.addNewProduct);
router.put("/:id", isAdminUser, productController.updateProduct);
router.delete("/:id", isAdminUser, productController.deleteProduct);

module.exports = router;