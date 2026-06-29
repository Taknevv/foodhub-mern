const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  toggleFavorite,
  getFavorites,
} = require("../controllers/userController");

router.post("/favorite/:id", protect, toggleFavorite);

router.get("/favorites", protect, getFavorites);

module.exports = router;