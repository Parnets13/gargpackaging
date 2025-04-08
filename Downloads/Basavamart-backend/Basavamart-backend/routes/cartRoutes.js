const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
  updateQuantity
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addToCart);
router.delete("/remove/:id", protect, removeFromCart);
router.get("/getCart", protect, getCart);
router.put("/updateQuantity", protect, updateQuantity)

module.exports = router;
