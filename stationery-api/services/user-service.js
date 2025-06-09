const User = require("../models/User");
const { updateUserFields } = require("../config/requests-config");
const { filterFields } = require("../utils/validation");
const { createError } = require("../utils/errors");
const { deleteFromCloudinary, extractPublicId, isHostedInMyCloudinary } = require("../utils/cloudinary-utils");

const updateUserById = async (userId, updates) => {
  const user = await User.findById(userId);

  const { set, unset } = filterFields(updates, updateUserFields);

  const updatePayload = {};
  if(Object.keys(set).length) updatePayload.$set = set;
  if(Object.keys(unset).length) updatePayload.$unset = unset;
  
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    updatePayload,
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) {
    throw createError("User not found! If this error persists, please contact support", 404);
  }

  if (
    isHostedInMyCloudinary(user.avatar) &&
    !isHostedInMyCloudinary(updatedUser)
  ) {
    const avatarPublicId = extractPublicId(user.avatar);
    if (avatarPublicId) {
      await deleteFromCloudinary(avatarPublicId);
    }
  }

  return updatedUser;
}

module.exports = { updateUserById };