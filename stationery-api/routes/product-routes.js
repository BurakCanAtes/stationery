const { Router } = require("express");

const productController = require("../controllers/product-controller");

const isAdminUser = require("../middlewares/permission-middleware");

const router = Router();

// TODO: handle product methods
router.get("", productController.getProducts);
router.get("/:id", (req, res) => res.send("Get Product Details"));
router.post("", isAdminUser, productController.addNewProduct);
router.put("/:id", (req, res) => res.send("Update Product"));
router.delete("/:id", (req, res) => res.send("Delete Product"));

module.exports = router;