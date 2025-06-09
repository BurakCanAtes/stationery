const { Readable } = require("stream");
const crypto = require("crypto");

const cloudinary = require("../config/cloudinary-config");

const uploadToCloudinary = (buffer, folder, publicId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: publicId || undefined,
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

const singleUpload = async (buffer, folder, publicId) => {
  const result = await uploadToCloudinary(buffer, folder, publicId);
  return {
    asset_id: result.asset_id,
    public_id: result.public_id,
    version: result.version,
    width: result.width,
    height: result.height,
    format: result.format,
    created_at: result.created_at,
    bytes: result.bytes,
    url: result.url,
    secure_url: result.secure_url,
    asset_folder: result.asset_folder,
  };
};

const generateImageHash = (file) =>
  crypto.createHash("md5").update(file.buffer).digest("hex");

const multipleUpload = async (files, folder, productId) => {
  const fileDir = productId ? `${folder}/${productId}` : folder;

  const results = await Promise.all(
    files.map((file) => {
      const publicId = generateImageHash(file);
      return singleUpload(file.buffer, fileDir, publicId);
    })
  );
  return results;
};

const deleteFromCloudinary = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

const isHostedInMyCloudinary = (url) => {
  return typeof url === "string" &&
    url.includes(`res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}`);
};


const extractPublicId = (url) => {
  // Example url: https://res.cloudinary.com/dgxfc0jdc/image/upload/v1747828270/avatars/680cb5755370e720a66a91f6.jpg
  if (!url) return null;

  // Remove base URL
  const parts = url.split("/");

  // Find index of "upload"
  const uploadIndex = parts.findIndex((p) => p === "upload");
  if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) return null;

  // Slice from after "upload" to end, join with /
  const publicIdWithExt = parts.slice(uploadIndex + 2).join("/");

  // Remove file extension
  const lastDotIndex = publicIdWithExt.lastIndexOf(".");
  return lastDotIndex !== -1
    ? publicIdWithExt.substring(0, lastDotIndex)
    : publicIdWithExt;
};


module.exports = {
  singleUpload,
  multipleUpload,
  deleteFromCloudinary,
  isHostedInMyCloudinary,
  extractPublicId,
};
