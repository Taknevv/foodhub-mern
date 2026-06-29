const User = require("../models/User");

// Toggle Favorite
const toggleFavorite = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    res.json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
};