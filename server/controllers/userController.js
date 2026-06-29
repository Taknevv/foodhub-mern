const User = require("../models/User");

const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const foodId = req.params.id;

    const exists = user.favorites.includes(foodId);

    if (exists) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== foodId
      );
    } else {
      user.favorites.push(foodId);
    }

    await user.save();

    res.json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    res.json({
      success: true,
      foods: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const Food = require("../models/Food");

const getSellerProfile = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id).select("-password");

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    const foods = await Food.find({
      user: seller._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      seller,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
  getSellerProfile,
};