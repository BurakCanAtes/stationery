const mongoose = require("mongoose");

const User = require("../models/User");
const { createError } = require("./errors");
const { DEFAULT_PAGE, PAGE_SIZE, MAX_PAGE_SIZE } = require("../config/product-config");

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

const isValidMongooseId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const applyPatch = (document, set, unset) => {
  Object.entries(set).forEach(([key, value]) => {
    document[key] = value;
  });

  Object.keys(unset).forEach((key) => {
    document[key] = undefined;
  });

  return document;
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

const createPagination = (
  queryPage,
  queryLimit,
  totalItems,
  defaultPage = DEFAULT_PAGE,
  defaultSize = PAGE_SIZE,
  defaultMaxSize = MAX_PAGE_SIZE
) => {
  const pageNumber = Math.max(1, parseInt(queryPage, 10) || defaultPage);
  const pageSize = Math.min(
    Math.max(1, parseInt(queryLimit, 10) || defaultSize),
    defaultMaxSize
  );
  const skip = (pageNumber - 1) * pageSize;

  const totalPages = Math.ceil(totalItems / pageSize);
  const isLastPage = pageNumber >= totalPages;

  return {
    skip,
    pageNumber,
    totalPages,
    pageSize,
    isLastPage,
  };
};

module.exports = {
  findUserById,
  buildNestedUpdatePayload,
  throwIfPatchEmpty,
  isValidMongooseId,
  applyPatch,
  createPagination
};