const mongoose = require("mongoose");

const stationerySchema = new mongoose.Schema({
  color: {
    type: String,
    maxlength: [20, "Color name must be at most 20 characters"],
  },
  brand: {
    type: String,
    maxlength: [30, "Brand name must be at most 30 characters"],
    required: [true, "Brand is required"],
  },
});

const Stationery = mongoose.model("Stationery", stationerySchema);

module.exports = Stationery;