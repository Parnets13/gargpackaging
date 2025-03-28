// models/category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true }, // Link to Brand
  img: { type: String }, // Optional: Add an image field for categories
});

module.exports = mongoose.model("Category", categorySchema);