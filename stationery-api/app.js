require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = express.Router();

const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const userAddressRoutes = require("./routes/user-address-routes");
const uploadRoutes = require("./routes/upload-routes");
const categoryRoutes = require("./routes/category-routes");
const productRoutes = require("./routes/product-routes");
const cartRoutes = require("./routes/cart-routes");

const handleErrors = require("./middlewares/errors-middleware");
const verifyUser = require("./middlewares/auth-middleware");

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

async function main() {
  const dbURI = process.env.DB_URI;

  if (!dbURI) {
    console.error(
      "Database URI is missing. Please set DB_URI in your .env file."
    );
    process.exit(1);
  }

  await mongoose.connect(dbURI);
  app.listen(8080);
}

try {
  main();
} catch (error) {
  console.error(error);
}

router.use("/auth", authRoutes);
router.use("/users/me", verifyUser, userRoutes);
router.use("/users/addresses", verifyUser, userAddressRoutes);
router.use("/upload", verifyUser, uploadRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/cart", verifyUser, cartRoutes);

app.use("/api", router);
app.use(handleErrors);

