// routes/foodItemRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const foodItemController = require("../controllers/menuItemController");
const { upload, resizeImage } = require("../config/upload");

// Route to add a new food item
router.post(
  "/menu-items/add",
  auth,
  upload.single("image"),
  resizeImage,
  foodItemController.addFoodItem
);

// Route to get all food items
router.get("/menu-items", foodItemController.getAllFoodItems);

// Route to get a single food item by ID
router.get("/menu-items/:id", foodItemController.getFoodItemById);

// Route to edit a food item
router.put("/menu-items/edit/:id", auth, foodItemController.editFoodItem);

// Route to delete a food item
router.delete(
  "/menu-items/delete/:id",
  auth,
  foodItemController.deleteFoodItem
);

module.exports = router;
