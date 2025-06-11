const { Router } = require("express");

// const productController = require("../controllers/product-controller"); // TODO: create product controller

const router = Router();

// TODO: handle product methods
router.get("/products", (req, res) => res.send("Get All Products"));
router.get("/products/:id", (req, res) => res.send("Get Product Details"));
router.post("/products", (req, res) => res.send("Add Products"));
router.put("/products/:id", (req, res) => res.send("Update Product"));
router.delete("/products/:id", (req, res) => res.send("Delete Product"));

module.exports = router;