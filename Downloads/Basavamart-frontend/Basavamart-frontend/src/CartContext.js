import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getTokenFromCookie } from "./utils/handleToken";

export const CartContext = createContext();
const API_URL = "http://localhost:3003/api/cart";

export const CartProvider = ({ children }) => {
  const [cartTotal, setCartTotal] = useState(0);

  // Function to fetch and update cart items
  const fetchCartItems = async () => {
    try {
      const token = getTokenFromCookie();
      
      if (!token) {
        console.log("No user token found, skipping cart fetch");
        return; // Skip API call if no token is found
      }
      
      const response = await axios.get(`${API_URL}/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const items = response.data.items || [];
      updateCartTotal(items);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
      // Don't update UI or show error toast for cart fetch issues
    }
  };

  // Function to update cart total count
  const updateCartTotal = (items) => {
    const total = items.length;
    setCartTotal(total);
  };

  useEffect(() => {
    fetchCartItems(); // Initial fetch when the component is loaded
  }, []);

  // You can call fetchCartItems whenever an item is added or deleted
  const addItemToCart = async (newItem) => {
    try {
      const token = getTokenFromCookie();
      await axios.post(
        `${API_URL}/addToCart`,
        { item: newItem },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCartItems(); // Fetch updated cart after adding item
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      const token = getTokenFromCookie();
      await axios.delete(`${API_URL}/removeFromCart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartItems(); // Fetch updated cart after removing item
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartTotal, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
