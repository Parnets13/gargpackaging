const mongoose = require("mongoose");
const userEnquiry = require("../models/enquiry");

exports.addUserEnquiry = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, gst } = req.body;
    const userEnq = new userEnquiry({
      firstname,
      lastname,
      email,
      phone,
      gst,
    });
    await userEnq.save();
    console.log("enquiry added");
    res.status(200).json({ message: "User enquiry added successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getUserEnquiry = async (req, res) => {
  try {
    const userEnq = await userEnquiry.find();
    res.status(200).json(userEnq);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Failed to fetch Enquiries" });
  }
};

exports.deleteUserEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    await userEnquiry.findByIdAndDelete(id);
    res.status(200).json({ message: "User Enquiry deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Failed to delete Enquiry" });
  }
};
