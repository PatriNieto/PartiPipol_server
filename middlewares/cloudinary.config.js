// middlewares/cloudinary.config.js
require('dotenv').config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  url: process.env.CLOUDINARY_URL
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png", "webp"],
    folder: "my-app", // The name of the folder where images will be stored in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  },
});

module.exports = multer({ storage });