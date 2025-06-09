const User = require("../models/User");
const { createError } = require("./errors");

const findUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError("User not found! If this error persists, please contact support", 404);
  }
  return user;
}

const throwIfPatchEmpty = (set, unset) => {
  if (!Object.keys(set).length && !Object.keys(unset).length) {
    throw createError("No valid fields provided for update", 400);
  }
}

const buildNestedUpdatePayload = (prefix, set = {}, unset = {}) => {
  const updatePayload = { $set: {}, $unset: {} };

  if (Object.keys(set).length) {
    updatePayload.$set = Object.fromEntries(
      Object.entries(set).map(([k, v]) => [`${prefix}.$.${k}`, v])
    );
  }

  if (Object.keys(unset).length) {
    updatePayload.$unset = Object.fromEntries(
      Object.keys(unset).map((k) => [`${prefix}.$.${k}`, ""])
    );
  }

  return updatePayload;
}

module.exports = { findUserById, buildNestedUpdatePayload, throwIfPatchEmpty };