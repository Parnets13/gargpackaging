// models/subCategory.js
const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Link to Category
  img: { type: String }, // Optional: Add an image field for subcategories
});

module.exports = mongoose.model("SubCategory", subCategorySchema);