const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../subCategoryImg");
    
    // Check if directory exists, create if not
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Specify upload folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const subCategoryImg = multer({ storage });

module.exports = subCategoryImg;
