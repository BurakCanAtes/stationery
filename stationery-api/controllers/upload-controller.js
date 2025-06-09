const { SINGLE_TYPE, MULTIPLE_TYPE } = require("../config/multer-config");
const { multipleUpload, singleUpload } = require("../utils/cloudinary-utils");
const { createError } = require("../utils/errors");
const { AVATARS, userUploadPermissions } = require("../utils/upload-utils");
const { isUploadEmpty } = require("../utils/validation");

const uploadImage = async (req, res, next) => {
  try {
    const { type = SINGLE_TYPE, productId, folder = "uploads" } = req.query;
    const { userId, role } = req;

    userUploadPermissions(type, folder, role);

    if (isUploadEmpty(type, req)) {
      throw createError("No files uploaded", 400);
    }
    if (type === MULTIPLE_TYPE) {
      const images = await multipleUpload(req.files, folder, productId);

      res.status(200).json({ images });
    } else {
      let publicId;
      if (folder === AVATARS) {
        publicId = userId;
      }
      
      const result = await singleUpload(req.file.buffer, folder, publicId);

      res.status(200).json(result);
    }
  } catch (error) {
    return next(error);
  }
}

module.exports = uploadImage;
