const mongoose = require("mongoose");

const Product = require("./Product");

const stationerySchema = new mongoose.Schema({
  color: {
    type: String,
    maxlength: [20, "Color name must be at most 20 characters"],
    trim: true,
  },
  brand: {
    type: String,
    maxlength: [30, "Brand name must be at most 30 characters"],
    required: [true, "Brand is required"],
    trim: true,
  },
});

const Stationery = Product.discriminator("Stationery", stationerySchema);

module.exports = Stationery;