const { upload, SINGLE_TYPE, MULTIPLE_TYPE, MULTIPLE_UPLOAD_FIELD, SINGLE_UPLOAD_FIELD, MAX_FILES_ALLOWED } = require("../config/multer-config");

const dynamicUpload = (req, res, next) => {
  const type = req.query.type || SINGLE_TYPE;
  const limit = Math.min(parseInt(req.query.limit) || MAX_FILES_ALLOWED, MAX_FILES_ALLOWED);

  if(type === MULTIPLE_TYPE) {
    return upload.array(MULTIPLE_UPLOAD_FIELD, limit)(req, res, next);
  }

  return upload.single(SINGLE_UPLOAD_FIELD)(req, res, next);
}

const extractReadableTypes = (mimeList) => {
  return mimeList
    .map((type) => {
      const [, subtype] = type.split("/");
      return subtype?.toUpperCase();
    })
    .join(", ");
};

module.exports = { dynamicUpload, extractReadableTypes };