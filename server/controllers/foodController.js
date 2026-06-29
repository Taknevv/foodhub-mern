const Food = require("../models/Food");

// ==========================================
// Get All Foods (Search + Filters + Sorting)
// ==========================================
const getFoods = async (req, res) => {
  try {
    const {
      search,
      category,
      location,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    let query = {};

    // Search by title or seller
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          seller: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category
    if (category && category !== "All") {
      query.category = category;
    }

    // Location
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Price Range
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    let foods = Food.find(query);

    switch (sort) {
      case "priceAsc":
        foods = foods.sort({ price: 1 });
        break;

      case "priceDesc":
        foods = foods.sort({ price: -1 });
        break;

      case "latest":
        foods = foods.sort({ createdAt: -1 });
        break;

      default:
        foods = foods.sort({ createdAt: -1 });
    }

    foods = await foods;

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

// =====================
// Add Food
// =====================
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

// =====================
// Get Food By ID
// =====================
const getFoodById = async (req, res) => {
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

// =====================
// My Listings
// =====================
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

// =====================
// Delete Food
// =====================
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

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

// =====================
// Update Food
// =====================
const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

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