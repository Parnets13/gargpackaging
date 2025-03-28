const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img:{type:String},
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Brand", brandSchema);
