const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Middleware FIRST
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-url.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());

// Routes AFTER middleware
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server running on Port ${PORT}`);
  console.log("=================================");
});