const { Router } = require("express");

const cartController = require("../controllers/cart-controller");

const router = Router();

router.get("", cartController.getUserCart);
router.post("", cartController.updateCart);
router.delete("", cartController.clearCart);

module.exports = router;