const { SINGLE_TYPE, MULTIPLE_TYPE } = require("../config/multer-config");
const { createError } = require("../utils/errors");
const uploadToCloudinary = require("../utils/cloudinary-utils");

const uploadImage = async (req, res, next) => {
  const { type = SINGLE_TYPE } = req.query;

  try {
    if (type === MULTIPLE_TYPE) {
      if (!req.files || req.files.length === 0) {
        throw createError("No files uploaded", 400);
      }

      const images = req.files; // TODO: handle multiple image upload
    } else {
      if (!req.file) {
        throw createError("No file uploaded", 400);
      }
      // TODO: handle single image upload
      // const result = await uploadToCloudinary(req.file.buffer, "avatars");

      // res.status(200).json({
      //   url: result.secure_url,
      //   publicId: result.public_id,
      // });
    }

    res.send("Success!");
  } catch (error) {
    return next(error);
  }
}

module.exports = uploadImage;
