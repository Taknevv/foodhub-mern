const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  toggleFavorite,
  getFavorites,
} = require("../controllers/userController");

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// FAVORITES
router.post("/favorite/:id", protect, toggleFavorite);
router.get("/favorites", protect, getFavorites);

module.exports = router;