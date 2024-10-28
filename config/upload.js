// src/config/upload.js
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize upload
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed"));
  },
});

// Middleware to resize images
const resizeImage = async (req, res, next) => {
  if (!req.file) return next();

  const imagePath = path.join(
    __dirname,
    "../public/uploads",
    req.file.filename
  );
  const smallImagePath = path.join(
    __dirname,
    "../public/uploads",
    `small-${req.file.filename}`
  );
  const mediumImagePath = path.join(
    __dirname,
    "../public/uploads",
    `medium-${req.file.filename}`
  );

  try {
    // Resize image to small and medium sizes
    await sharp(imagePath).resize(200).toFile(smallImagePath);

    await sharp(imagePath).resize(500).toFile(mediumImagePath);

    req.file.smallImage = `small-${req.file.filename}`;
    req.file.mediumImage = `medium-${req.file.filename}`;

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { upload, resizeImage };
