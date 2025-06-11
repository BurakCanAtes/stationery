const mongoose = require("mongoose");

const { MIN_BOOK_PAGES, MAX_BOOK_PAGES } = require("../config/product-config");
const Product = require("./product");

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    maxlength: [30, "Author name must be at most 30 characters"],
    required: [true, "Author is required"],
  },
  publisher: {
    type: String,
    maxlength: [30, "Publisher name must be at most 30 characters"],
    required: [true, "Publisher is required"],
  },
  pages: {
    type: Number,
    min: [MIN_BOOK_PAGES, `A book must have at least ${MIN_BOOK_PAGES} page`],
    max: [MAX_BOOK_PAGES, `A book cannot have more than ${MAX_BOOK_PAGES} pages`],
    required: [true, "Number of pages is required"],
  },
});

const Book = Product.discriminator("Book", bookSchema);

module.exports = Book;