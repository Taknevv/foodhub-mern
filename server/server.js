const express = require("express");
const cors = require("cors");

const app = express(); // ✅ MUST be first

// Middleware
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

// Routes
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server running on Port ${PORT}`);
  console.log("=================================");
});