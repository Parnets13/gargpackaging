import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokenFromCookie } from "../utils/handleToken";

const API_URL = "http://localhost:3003

/api/cart";
const token = getTokenFromCookie()

// Increment quantity (i.e., add more of an item to the cart)
export const incrementQuantity = createAsyncThunk(
  "cart/incrementQuantity",
  async (productId, { dispatch }) => {
    await axios.post(
      `${API_URL}/add`, 
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(fetchCart()); // Optionally fetch updated cart after increment
  }
);

// Decrement quantity (i.e., remove one unitOfMeasurement of an item from the cart)
export const decrementQuantity = createAsyncThunk(
  "cart/decrementQuantity",
  async (productId, { dispatch }) => {
    await axios.post(
      `${API_URL}/remove`, 
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(fetchCart()); // Optionally fetch updated cart after decrement
  }
);

// Fetch cart from backend for logged-in users
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState }) => {
    if (!token) return [];
    try {
      const response = await axios.get(`${API_URL}/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.cart;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    }
  }
);

// Add item to cart and save it to backend
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { getState, dispatch }) => {
    await axios.post(`${API_URL}/add`, item, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchCart()); // Fetch updated cart after adding item
  }
);

// Remove item from cart and save it to backend
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { getState, dispatch }) => {
    await axios.post(
      `${API_URL}/remove`,
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(fetchCart()); // Fetch updated cart after removing item
  }
);

const calculateTotals = (items, selectedTerms) => {
  const subtotal = items.reduce((sum, item) => {
    const term = selectedTerms[item.productId] || "0 days";
    const adjustedPrice = calculatePriceWithTerm(item.price0, term);
    return sum + adjustedPrice * item.quantity;
  }, 0);
  return { subtotal, total: subtotal };
};

const calculatePriceWithTerm = (price, term) => {
  let multiplier = 1;
  if (term === "30 days") multiplier = 1.1;
  else if (term === "60 days") multiplier = 1.2;
  else if (term === "90 days") multiplier = 1.3;

  return price * multiplier;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    subtotal: 0,
    total: 0,
    selectedTerms: {}, // To hold the selected payment terms
  },
  reducers: {
    updateTotals: (state) => {
      const totals = calculateTotals(state.items, state.selectedTerms);
      state.subtotal = totals.subtotal;
      state.total = totals.total;
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    updateSelectedTerms: (state, action) => {
      const { productId, term } = action.payload;
      state.selectedTerms[productId] = term;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
        const totals = calculateTotals(state.items, state.selectedTerms);
        state.subtotal = totals.subtotal;
        state.total = totals.total;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItemIndex = state.items.findIndex(
          (cartItem) => cartItem.productId === action.meta.arg.productId // Ensure correct identifier
        );

        if (existingItemIndex >= 0) {
          state.items[existingItemIndex].quantity += 1;
        } else {
          state.items.push({ ...action.meta.arg, quantity: 1 });
        }

        const totals = calculateTotals(state.items, state.selectedTerms);
        state.subtotal = totals.subtotal;
        state.total = totals.total;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const itemIndex = state.items.findIndex(
          (item) => item.productId === action.meta.arg
        );

        if (itemIndex !== -1) {
          if (state.items[itemIndex].quantity > 1) {
            state.items[itemIndex].quantity -= 1;
          } else {
            state.items.splice(itemIndex, 1);
          }
        }

        const totals = calculateTotals(state.items, state.selectedTerms);
        state.subtotal = totals.subtotal;
        state.total = totals.total;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(incrementQuantity.fulfilled, (state, action) => {
        const updatedItems = state.items.map((item) =>
          item.productId === action.meta.arg
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        state.items = updatedItems;
        const totals = calculateTotals(state.items, state.selectedTerms);
        state.subtotal = totals.subtotal;
        state.total = totals.total;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })
      .addCase(decrementQuantity.fulfilled, (state, action) => {
        const updatedItems = state.items.map((item) =>
          item.productId === action.meta.arg && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        state.items = updatedItems;
        const totals = calculateTotals(state.items, state.selectedTerms);
        state.subtotal = totals.subtotal;
        state.total = totals.total;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      });
  },
});

export const { updateTotals, updateSelectedTerms } = cartSlice.actions;
export default cartSlice.reducer;