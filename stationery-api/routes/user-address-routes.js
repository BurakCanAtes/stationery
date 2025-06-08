const { Router } = require("express");

const addressesController = require("../controllers/user-address-controller");

const router = Router();

router.get("", addressesController.getAllAddresses);
router.post("", addressesController.addNewAddress);
router.patch("/:addressId", addressesController.updateAddress);
router.delete("/:addressId", (req, res) => res.send("Delete one address")); // TODO: delete an address

module.exports = router;