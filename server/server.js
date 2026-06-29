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

app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});