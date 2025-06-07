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

module.exports = { singleUpload, multipleUpload };
