const Address = require("../models/address");

// Add address
exports.addAddress = async (req, res) => {
  try {
    // const { userId, role } = req.user; // `protect` middleware adds `user` to `req`

    // if (req.body.isDefault) {
    //   await Address.updateMany({ userId }, { isDefault: false });
    // }

    const address = new Address({
      userId: req.user.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
      isDefault: req.body.isDefault,
    });
    await address.save();
    // console.log(address);
    res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add address" });
  }
};

// Get user addresses
exports.getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    if(addresses){
      res.status(200).json(addresses);
    }else{
      res.status(404).json({ message: "No addresses found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve addresses" });
  }
};

// Remove address
exports.deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete address" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAddress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
