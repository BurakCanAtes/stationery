const { Router } = require("express");

const authController = require("../controllers/auth-controller");

const verifyUser = require("../middlewares/auth-middleware");

const router = Router();

router.post("/register", authController.register);
router.post("/local", authController.login);
router.get("/me", verifyUser, authController.getAuthUser);

module.exports = router;