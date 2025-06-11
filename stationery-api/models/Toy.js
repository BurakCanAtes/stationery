const mongoose = require("mongoose");

const Product = require("./Product");

const toySchema = new mongoose.Schema({
  ageRange: {
    type: String,
    maxlength: [20, "Age range must be at most 20 characters"],
    required: [true, "Age range is required"],
    trim: true,
  },
  brand: {
    type: String,
    maxlength: [30, "Brand name must be at most 30 characters"],
    required: [true, "Brand is required"],
    trim: true,
  },
});

const Toy = Product.discriminator("Toy", toySchema);

module.exports = Toy;