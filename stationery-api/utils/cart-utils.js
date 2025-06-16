const { createError } = require("./errors");
const { isValidMongooseId } = require("./shared-utils")

const throwInvalidCartProduct = ({ product, quantity }) => {
  if (!isValidMongooseId(product)) {
    throw createError("Invalid product ID", 400);
  }

  if (
    quantity !== undefined &&
    (isNaN(quantity) || typeof quantity !== "number" || quantity < 0)
  ) {
    throw createError("Invalid product amount", 400);
  }
}

module.exports = { throwInvalidCartProduct };