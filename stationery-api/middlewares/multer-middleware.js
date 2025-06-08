const { MulterError } = require("multer");

const { dynamicUpload, extractReadableTypes } = require("../utils/multer-utils");
const { createError } = require("../utils/errors");
const { MAX_FILES_ALLOWED, MAX_FILE_SIZE, ALLOWED_MIME_TYPES } = require("../config/multer-config");

const multerMiddleware = (req, res, next) => {
  dynamicUpload(req, res, (err) => {
    if(err instanceof MulterError) {
      const ALLOWED_TYPES = extractReadableTypes(ALLOWED_MIME_TYPES);
      if (err.code === "INVALID_FILE_TYPE") {
        return next(createError(`Invalid file type. Only ${ALLOWED_TYPES} images are allowed.`, 400));
      }
      
      if (err.code === "LIMIT_FILE_COUNT") {
        return next(createError(`Maximum number of files exceeded. Limit is ${MAX_FILES_ALLOWED}.`, 400));
      }

      if (err.code === "LIMIT_FILE_SIZE") {
        return next(
          createError(`One or more files exceed the ${MAX_FILE_SIZE / 1024 / 1024}MB size limit.`, 400)
        );
      }

      return next(createError("Upload error: " + err.message, 400));
    }

    if (err) {
      return next(createError("Unknown upload error: " + err.message, 500));
    }

    next();
  })
}

module.exports = multerMiddleware;
