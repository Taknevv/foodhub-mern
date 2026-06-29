const express = require("express");
const router = express.Router();

const {
  getFoods,
  addFood,
  getFoodById,
  getMyFoods,
  deleteFood,
  updateFood,
} = require("../controllers/foodController");

const protect = require("../middleware/authMiddleware");

router.get("/", getFoods);

router.get("/my-listings", protect, getMyFoods);

router.get("/:id", getFoodById);

router.post("/", protect, addFood);

router.put("/:id", protect, updateFood);

router.delete("/:id", protect, deleteFood);

module.exports = router;