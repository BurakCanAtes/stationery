require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const authRoutes = require("./routes/auth-routes");
const categoryRoutes = require("./routes/category-routes");

const handleErrors = require("./middlewares/errors-middleware");

const app = express();

// middleware
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
router.use("/categories", categoryRoutes);

app.use("/api", router);
app.use(handleErrors);

