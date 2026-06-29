const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  toggleFavorite,
  getFavorites,
  getSellerProfile,
} = require("../controllers/userController");

router.post("/favorite/:id", protect, toggleFavorite);

router.get("/favorites", protect, getFavorites);

// Public seller profile
router.get("/:id", getSellerProfile);

module.exports = router;