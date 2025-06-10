const mongoose = require("mongoose");

const toySchema = new mongoose.Schema({
  ageRange: {
    type: String,
    maxlength: [20, "Age range must be at most 20 characters"],
    required: [true, "Age range is required"],
  },
  brand: {
    type: String,
    maxlength: [30, "Brand name must be at most 30 characters"],
    required: [true, "Brand is required"],
  },
});

const Toy = mongoose.model("Toy", toySchema);

module.exports = Toy;