const express = require("express");
const {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress
} = require("../controllers/addressController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/addAddress", protect, addAddress);
router.delete("/deleteAddress/:id", protect, deleteAddress);
router.get("/getAddress", protect, getAddress);
router.put("/updateAddress/:id", protect, updateAddress);

module.exports = router;
