// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const categoryController = require("../controllers/categoryController");
const { upload, resizeImage } = require("../config/upload");

// Route to add a new category
router.post(
  "/categories/add",
  auth,
  upload.single("image"),
  resizeImage,
  categoryController.addCategory
);

// Route to get all categories
router.get("/categories", categoryController.getAllCategories);

// Route to get a single category by ID
router.get("/categories/:id", categoryController.getCategoryById);

// Route to edit a category
router.put(
  "/categories/edit/:id",
  auth,
  upload.single("image"),
  resizeImage,
  categoryController.editCategory
);

// Route to delete a category
router.delete(
  "/categories/delete/:id",
  auth,
  categoryController.deleteCategory
);

module.exports = router;
