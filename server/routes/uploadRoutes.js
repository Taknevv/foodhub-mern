const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("CLOUDINARY KEY CHECK:", {
      name: process.env.CLOUDINARY_CLOUD_NAME,
      key: process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING",
      secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
    });

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "foodhub",
    });

    res.json({
      success: true,
      imageUrl: result.secure_url,
    });

  } catch (err) {
    console.log("🔥 CLOUDINARY ERROR:", err); // IMPORTANT

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;