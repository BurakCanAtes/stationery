const { SINGLE_TYPE } = require("../config/multer-config");
const ROLES = require("../config/roles-config");
const { createError } = require("./errors");

const AVATARS = "avatars";

const userUploadPermissions = (type, folder, role) => {
  const isAvatar = type === SINGLE_TYPE && folder === AVATARS;

  if (!isAvatar && role !== ROLES.ADMIN) {
    throw createError("Forbidden access", 403);
  }
};

module.exports = { AVATARS, userUploadPermissions };
