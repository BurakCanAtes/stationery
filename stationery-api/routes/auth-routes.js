const { Router } = require("express");

const authController = require("../controllers/auth-controller");

const router = Router();

router.post("/register", authController.register);
router.post("/local", (req, res) => res.send("Login")); // TODO: implement login method
router.get("/me", (req, res) => res.send("Get Auth User")); // TODO: implement get auth user method

module.exports = router;