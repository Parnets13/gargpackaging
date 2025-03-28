// models/product.js
const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String },
  desc: { type: String },
  access: { type: String },
  material: { type: String },
  quality: { type: String },
  weight: { type: String },
  img: { type: String },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }, // Add subcategory
  available: { type: String },
  variants: [variantSchema], // Add variants array
});

productSchema.methods.addVariant = function (variant) {
  this.variants.push(variant);
  return this.save();
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;