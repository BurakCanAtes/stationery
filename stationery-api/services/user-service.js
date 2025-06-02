const User = require("../models/User");
const { updateUserFields } = require("../config/requests-config");
const { filterFields } = require("../utils/validation");
const { createError } = require("../utils/errors");

const updateUserById = async (userId, updates) => {
  const { set, unset } = filterFields(updates, updateUserFields);

  const updatePayload = {};
  if(Object.keys(set).length) updatePayload.$set = set;
  if(Object.keys(unset).length) updatePayload.$unset = unset;
  
  const user = await User.findByIdAndUpdate(
    userId,
    updatePayload,
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw createError("User not found! If this error persists, please contact support", 404);
  }

  return user;
}

module.exports = { updateUserById };