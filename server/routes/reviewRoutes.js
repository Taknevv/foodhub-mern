const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

// Get all reviews for a food
router.get("/:foodId", getReviews);

// Add a review (login required)
router.post("/:foodId", protect, addReview);

// Delete your own review
router.delete("/:id", protect, deleteReview);

module.exports = router;