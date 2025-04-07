const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
    getBanners,
    addBanner,
    editBanner,
    deleteBanner
} = require("../controllers/bannerController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/banners');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'banner-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});

router.get("/getBanners", getBanners);
router.post("/addBanner", upload.single('image'), addBanner);
router.put("/editBanner/:id", upload.single('image'), editBanner);
router.delete("/deleteBanner/:id", deleteBanner);

module.exports = router;