const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String },
  lastName: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  country: { type: String },
  state: { type: String },
  zipCode: { type: Number },
  isDefault: { type: Boolean, default: false },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
