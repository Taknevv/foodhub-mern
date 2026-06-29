const User = require("../models/User");

// Toggle Favorite
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

  res.json({ success: true });
};

// Get Favorites
const getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate("favorites");

  res.json({
    success: true,
    favorites: user.favorites,
  });
};

module.exports = {
  toggleFavorite,
  getFavorites,
};