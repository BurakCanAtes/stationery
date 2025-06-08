const { Router } = require("express");

const router = Router();

router.get("", (req, res) => res.send("All Addresses")); // TODO: get all addresses
router.post("", (req, res) => res.send("Add New Addresses")); // TODO: add new address
router.patch("/:addressId", (req, res) => res.send("Update one address")); // TODO: update an address
router.delete("/:addressId", (req, res) => res.send("Delete one address")); // TODO: delete an address

module.exports = router;