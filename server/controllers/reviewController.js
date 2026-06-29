const Review = require("../models/Review");


// Add Review
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const foodId = req.params.foodId;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Please provide rating and comment",
      });
    }

    // Prevent duplicate review by same user
    const alreadyReviewed = await Review.findOne({
      food: foodId,
      user: req.user.id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this food",
      });
    }

    const review = await Review.create({
      food: foodId,
      user: req.user.id,
      username: req.user.username,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Reviews
const getReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      food: req.params.foodId,
    }).sort({
      createdAt: -1,
    });

    const total = reviews.length;

    const average =
      total === 0
        ? 0
        : (
            reviews.reduce(
              (sum, item) => sum + item.rating,
              0
            ) / total
          ).toFixed(1);

    res.json({
      success: true,
      average,
      total,
      reviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Own Review
const deleteReview = async (req, res) => {
  try {

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
      message: "Review deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  addReview,
  getReviews,
  deleteReview,
};