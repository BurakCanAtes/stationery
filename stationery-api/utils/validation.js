const MAX_WISHLIST_ITEMS = 48;
const MAX_ADDRESS_NUMBER = 4;

function listLimit(val, limit) {
  return val.length <= limit;
}

function limitValidator(limit, label) {
  return {
    validator: (val) => listLimit(val, limit),
    message: `Number of ${label} cannot exceed ${limit}`
  }
}

function hasAllFields(data, fields) {
  return fields.every((field) => data[field] !== undefined);
}

module.exports = {
  MAX_WISHLIST_ITEMS,
  MAX_ADDRESS_NUMBER,
  limitValidator,
  hasAllFields,
};