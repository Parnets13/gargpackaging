const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: { type: String, required: true },
        productImg: { type: String },
        variant: {
          hsn: { type: String, required: true },
          name: { type: String },
          size: { type: String },
          price: { type: Number, required: true },
          qty: { type: Number, required: true },
          tax: { type: Number }
        },
        totalPrice: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
