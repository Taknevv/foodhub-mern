const User = require("../models/User");

// REGISTER (must exist)
const registerUser = async (req, res) => {
  res.send("register");
};

// LOGIN (must exist)
const loginUser = async (req, res) => {
  res.send("login");
};

// FAVORITES
const toggleFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);

  const foodId = req.params.id;

  const isFav = user.favorites.includes(foodId);

  if (isFav) {
    user.favorites = user.favorites.filter(
      (id) => id.toString() !== foodId
    );
  } else {
    user.favorites.push(foodId);
  }

  await user.save();

  res.json({
    success: true,
    message: isFav
      ? "Removed from favorites"
      : "Added to favorites",
  });
};

const getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate("favorites");

  res.json({
    success: true,
    favorites: user.favorites,
  });
};

module.exports = {
  registerUser,
  loginUser,
  toggleFavorite,
  getFavorites,
};