const { Router } = require("express");

const multerMiddleware = require("../middlewares/multer-middleware");
const uploadController = require("../controllers/upload-controller");

const router = Router();

router.post("", multerMiddleware, uploadController);

module.exports = router;