const { Router } = require("express");

// const userController = require("../controllers/user-controller"); // TODO: create user controller

const router = Router();

// TODO: handle user routes
router.get("", (req, res) => res.send("Get User"));
router.patch("", (req, res) => res.send("Update User"));
router.delete("", (req, res) => res.send("Delete User"));

module.exports = router;