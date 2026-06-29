const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (IMPORTANT FIX)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-url.vercel.app",
    ],
    credentials: true,
  })
);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FoodHub API running 🚀",
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/foods", require("./routes/foodRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

module.exports = app;