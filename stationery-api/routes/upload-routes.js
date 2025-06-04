const { Router } = require("express");

const dynamicUpload = require("../middlewares/multer-middleware");
const uploadController = require("../controllers/upload-controller");

const router = Router();

router.post("", dynamicUpload, uploadController);

module.exports = router;