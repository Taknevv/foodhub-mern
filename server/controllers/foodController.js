const Food = require("../models/Food");

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addFood = async (req, res) => {
  try {
    const {
      title,
      price,
      image,
      category,
      seller,
      location,
      description,
      phone,
    } = req.body;

    if (
      !title ||
      !price ||
      !image ||
      !category ||
      !seller ||
      !location ||
      !description ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const food = await Food.create({
      title,
      price,
      image,
      category,
      seller,
      location,
      description,
      phone,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Food Added Successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Foods
const getMyFoods = async (req, res) => {
  try {
    const foods = await Food.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Food
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    // Only owner can delete
    if (food.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this food",
      });
    }

    await food.deleteOne();

    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate(
      "user",
      "_id username email"
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    if (food.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Food updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  getFoods,
  addFood,
  getFoodById,
  getMyFoods,
  deleteFood,
  updateFood,
};