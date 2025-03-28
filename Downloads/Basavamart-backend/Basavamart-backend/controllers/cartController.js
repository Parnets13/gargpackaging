const User = require("../models/user");
const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const { cartItems } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      const newCart = new Cart({
        userId,
        items: cartItems,
      });
      await newCart.save();
      return res
        .status(200)
        .json({ message: "Items added to cart", cart: newCart });
    } else {
      for (const newItem of cartItems) {
        const existingItemIndex = cart.items.findIndex(
          (item) =>
            item.productId.toString() === newItem.productId &&
            item.variant.sku === newItem.variant.sku
        );

        if (existingItemIndex !== -1) {
          // Update quantity and total price of the existing variant
          cart.items[existingItemIndex].variant.quantity +=
            newItem.variant.quantity;
          cart.items[existingItemIndex].totalPrice =
            cart.items[existingItemIndex].variant.price *
            cart.items[existingItemIndex].variant.quantity;
        } else {
          // Add new variant if it doesn't exist in the cart
          cart.items.push(newItem);
        }
      }

      await cart.save();
      return res
        .status(200)
        .json({ message: "Cart updated successfully", cart });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateQuantity = async (req, res) => {
  const { itemId, newQuantity } = req.body;
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find((item) => item._id.toString() === itemId);
    if (item) {
      item.variant.quantity = newQuantity;
      item.totalPrice = item.variant.price * newQuantity; // Update total price
      await cart.save();
      return res.status(200).json({ message: "Quantity updated", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.removeFromCart = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter((item) => item._id.toString() !== id);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
