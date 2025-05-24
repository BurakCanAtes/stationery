const mongoose = require("mongoose");
const { isEmail } = require("validator");

const { MAX_WISHLIST_ITEMS, MAX_ADDRESS_NUMBER, limitValidator } = require("../utils/validation");

const addressSchema = new mongoose.Schema({
  label: {
    type: String,
    enum: ["Home", "Work"],
    default: "Home",
  },
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  phone: {
    type: String
  },
  street: {
    type: String,
    required: [true, "Street name is required"],
  },
  city: {
    type: String,
    required: [true, "City name is required"],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
  },
  country: {
    type: String,
    required: [true, "Country name is required"],
  },
  isDefault: {
    type: Boolean,
    default: false
  }
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [30, "First name must be at most 30 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [30, "Last name must be at most 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addresses: {
      type: [addressSchema],
      validate: limitValidator(MAX_ADDRESS_NUMBER, "addresses"),
    },
    wishlist: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      validate: limitValidator(MAX_WISHLIST_ITEMS, "wishlist items"),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;