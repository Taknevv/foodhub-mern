const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-url.vercel.app",
    ],
    credentials: true,
  })
);

// ROUTES
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const foodRoutes = require("./routes/foodRoutes"); // ✅ MISSING BEFORE

app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/foods", foodRoutes); // ✅ THIS FIXES 404

module.exports = app;