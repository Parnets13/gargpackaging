const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  productName: { type: String },
  details: { type: String },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Enquiry", enquirySchema);
