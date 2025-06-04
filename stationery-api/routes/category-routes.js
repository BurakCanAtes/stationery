const { Router } = require("express");

// const categoryController = require("../controllers/category-controller");

const router = Router();

router.get("", (req, res) => res.send("Get All Categories"));
router.get("/:id", (req, res) => res.send("Get One Category"));
router.post("", (req, res) => res.send("Add New Category"));
router.patch("/:id", (req, res) => res.send("Update Category"));

// TODO: optional => delete category

module.exports = router;