const { Router } = require("express");

const authController = require("../controllers/auth-controller");

const router = Router();

router.post("/register", authController.register);
router.post("/local", authController.login);
router.get("/me", (req, res) => res.send("Get Auth User")); // TODO: implement get auth user method

module.exports = router;