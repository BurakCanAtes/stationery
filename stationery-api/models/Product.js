const mongoose = require("mongoose");

const { productImageValidator } = require("../utils/validation");
const { MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE, MIN_NUMBER_IN_STOCK, MAX_NUMBER_IN_STOCK } = require("../config/product-config");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [2, "Product name must be at least 2 characters"],
      maxlength: [100, "Product name must be at most 100 characters"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [MIN_PRODUCT_PRICE, "Price cannot be negative"],
      max: [MAX_PRODUCT_PRICE, "Price cannot exceed 999.999,00"],
    },
    images: {
      type: [String],
      validate: productImageValidator(),
    },
    stock: {
      type: Number,
      required: [true, "Stock count is required"],
      min: [MIN_NUMBER_IN_STOCK, "Stock cannot be negative"],
      max: [MAX_NUMBER_IN_STOCK, "Stock cannot exceed 5000"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;