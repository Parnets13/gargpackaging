const Banner = require("../models/bannerModel");
const fs = require("fs");
const path = require("path");

// Get all banners
exports.getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        console.error("Error fetching banners:", error);
        res.status(500).json({ message: "Error fetching banners" });
    }
};

// Add new banner
exports.addBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const newBanner = new Banner({
            title: req.body.title,
            image: `/uploads/banners/${req.file.filename}`
        });

        const savedBanner = await newBanner.save();
        res.status(201).json(savedBanner);
    } catch (error) {
        console.error("Error adding banner:", error);
        res.status(500).json({ message: "Error adding banner" });
    }
};

// Edit banner
exports.editBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        // Update title
        if (req.body.title) {
            banner.title = req.body.title;
        }

        // If new image is uploaded
        if (req.file) {
            // Delete old image if it exists
            if (banner.image) {
                const oldImagePath = path.join(__dirname, `../public${banner.image}`);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            // Set new image path
            banner.image = `/uploads/banners/${req.file.filename}`;
        }

        const updatedBanner = await banner.save();
        res.status(200).json(updatedBanner);
    } catch (error) {
        console.error("Error updating banner:", error);
        res.status(500).json({ message: "Error updating banner" });
    }
};

// Delete banner
exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        // Delete image file if it exists
        if (banner.image) {
            const imagePath = path.join(__dirname, `../public${banner.image}`);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Banner.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        console.error("Error deleting banner:", error);
        res.status(500).json({ message: "Error deleting banner" });
    }
};