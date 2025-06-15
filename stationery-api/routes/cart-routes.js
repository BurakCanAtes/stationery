const { Router } = require("express");

// const cartController = require("../controllers/cart-controller");

const router = Router();

router.get("", (req, res) => res.send("Get Cart")); // TODO: Create Get cart function
router.post("", (req, res) => res.send("Add product to cart")); // TODO: Create add product to cart function
router.delete("", (req, res) => res.send("Remove everything from cart")); // TODO: Create delete cart function

module.exports = router;