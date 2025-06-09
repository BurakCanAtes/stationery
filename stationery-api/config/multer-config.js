const multer = require("multer");

// Use this for only images, 2mb size limit for single image with 15 max files in single request
const storage = multer.memoryStorage();

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB per file
const MAX_FILES_ALLOWED = 15; // max 15 files per request
const SINGLE_TYPE = "single";
const MULTIPLE_TYPE = "multiple";
const SINGLE_UPLOAD_FIELD = "image";
const MULTIPLE_UPLOAD_FIELD = "images";
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("INVALID_FILE_TYPE", file.fieldname));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES_ALLOWED,
  },
  fileFilter,
});

module.exports = {
  upload,
  SINGLE_TYPE,
  MULTIPLE_TYPE,
  SINGLE_UPLOAD_FIELD,
  MULTIPLE_UPLOAD_FIELD,
  MAX_FILE_SIZE,
  MAX_FILES_ALLOWED,
  ALLOWED_MIME_TYPES,
};
