const { Router } = require("express");

const userController = require("../controllers/user-controller");

const router = Router();

// TODO: handle user routes
router.get("", userController.getUser);
router.patch("", userController.updateUser);
router.delete("", (req, res) => res.send("Delete User"));

module.exports = router;