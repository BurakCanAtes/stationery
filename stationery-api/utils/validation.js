const { MULTIPLE_TYPE, SINGLE_TYPE, MAX_FILES_ALLOWED } = require("../config/multer-config");

const MAX_WISHLIST_ITEMS = 48;
const MAX_ADDRESS_NUMBER = 4;
const MIN_PRODUCT_IMG_NUMBER = 1;
const MAX_PRODUCT_IMG_NUMBER = 15;

function listLimit(val, limit) {
  return val.length <= limit;
}

function limitValidator(limit, label) {
  return {
    validator: (val) => listLimit(val, limit),
    message: `Number of ${label} cannot exceed ${limit}`,
  };
}

function productImageValidator() {
  return {
    validator: (arr) =>
      arr.length >= MIN_PRODUCT_IMG_NUMBER &&
      arr.length <= MAX_PRODUCT_IMG_NUMBER &&
      MAX_PRODUCT_IMG_NUMBER <= MAX_FILES_ALLOWED,
    message: `A product must have at least ${MIN_PRODUCT_IMG_NUMBER} image and at most ${MAX_PRODUCT_IMG_NUMBER} images`,
  };
}

function hasAllFields(data, fields) {
  return fields.every((field) => data[field] !== undefined);
}

const isInvalidBody = (data, fields) => {
  return !data || !hasAllFields(data, fields);
};

function filterFields (req, allowedFields) {
  const set = {};
  const unset = {};

  for (const key of allowedFields) {
    const value = req[key];

    if (value !== undefined && value !== null) {
      set[key] = value;
    }

    if (value === null) {
      unset[key] = "";
    }
  }

  return { set, unset };
};

function isUploadEmpty(type, req) {
  return (
    (type === MULTIPLE_TYPE && (!req.files || req.files.length === 0)) ||
    (type === SINGLE_TYPE && !req.file)
  );
};

module.exports = {
  MAX_WISHLIST_ITEMS,
  MAX_ADDRESS_NUMBER,
  limitValidator,
  hasAllFields,
  filterFields,
  isUploadEmpty,
  isInvalidBody,
  productImageValidator
};
