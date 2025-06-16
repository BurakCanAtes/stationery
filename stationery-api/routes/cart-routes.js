const { Router } = require("express");

const cartController = require("../controllers/cart-controller");

const router = Router();

router.get("", cartController.getUserCart);
router.post("", cartController.updateCart);
router.delete("", (req, res) => res.send("Remove everything from cart")); // TODO: Create delete cart function

module.exports = router;