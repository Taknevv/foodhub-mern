const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const generateToken = require("../utils/generateToken");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    res.json({
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

  res.json({ success: true });
};

const getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate("favorites");

  res.json({ success: true, favorites: user.favorites });
};

module.exports = {
  registerUser,
  loginUser,
  toggleFavorite,
  getFavorites,
};