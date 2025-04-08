import React, { useEffect, useState } from "react";
import { Trash2, ShoppingBag, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import axios from "axios";
import { getTokenFromCookie } from "../utils/handleToken";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3003/api/cart";
const token = getTokenFromCookie();

export default function Cart() {
  const [carts, setCarts] = useState({ items: [] });
  const [selectedTerm, setSelectedTerm] = useState("0 days");
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const serviceFee = 3;

  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      fetchCart();
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await axios.put(
        `${API_URL}/updateQuantity`,
        { itemId, newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        fetchCart(); // Refresh cart data after updating quantity
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const fetchCart = async () => {
    // if (!token) {
    //   alert("login first");
    //   navigate("/MyAccountSignIn");
    // } else {
    try {
      const response = await axios.get(`${API_URL}/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.items && response.data.items.length === 0) {
        setCarts({ items: [] });
      } else {
        setCarts(response.data);
      }
      calculateSubtotal(response.data.items, selectedTerm);
    } catch (error) {
      console.log(" You are not logged in", error);
    }
  };

  const calculateSubtotal = (items, paymentTerm) => {
    let subtotalAmount = 0;
    items.forEach((item) => {
      subtotalAmount += item.totalPrice;
    });
    let multiplier = 1;
    switch (paymentTerm) {
      case "15 days":
        multiplier = 1.02;
        break;
      case "30 days":
        multiplier = 1.04; // Apply 4% extra for 30 days
        break;
      case "45 days":
        multiplier = 1.06; // Apply 6% extra for 45 days
        break;
      case "60 days":
        multiplier = 1.08; // Apply 8% extra for 60 days
        break;
      case "90 days":
        multiplier = 1.15; // Apply 15% extra for 90 days
        break;
      default:
        multiplier = 1;
    }
    setSubtotal(subtotalAmount * multiplier);
  };

  const handlePaymentTermChange = (event) => {
    setSelectedTerm(event.target.value);
    calculateSubtotal(carts.items, event.target.value);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = () => {
    if (!token) {
      toast.error("Please log in to proceed to checkout.");
      // navigate("/MyAccountSignin");
    } else {
      navigate("/checkout", {
        state: {
          subtotal: subtotal, // Adding service fee to subtotal
          selectedTerm: selectedTerm,
        },
      });
    }
  };

  if (carts.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <Link
          to="/shop"
          className="inline-flex items-center px-4 py-2 text-white rounded-lg "
          style={{ backgroundColor: "#ED8019" }}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800">
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-1">{carts.items.length} items</p>
            </div>

            <div className="divide-y divide-gray-100">
              {carts.items.map((item) => (
                <div
                  key={item._id}
                  className="p-6 flex flex-col sm:flex-row gap-4"
                >
                  <div className="w-36 h-36 rounded-lg overflow-hidden flex-shrink-0">
                    <LazyLoadImage
                      src={`http://localhost:3003

${item.productImg}`}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                      effect="blur"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">
                      {item.productName}
                    </h3>
                    <hr />
                    <div className="flex justify-content-start gap-9">
                      <div className="flex items-center">
                        <p style={{ color: "black", fontSize: "18px" }}>
                          Size: {item.variant.name} <br />
                          Quantity: {item.variant.qty}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.variant.qty - 1)
                          }
                          disabled={item.variant.qty <= 1}
                          className="p-3 hover:text-gray-900"
                          style={{ color: "black", fontSize: "33px" }}
                        >
                          -
                        </button>
                        <span
                          className="mx-2"
                          style={{
                            color: "black",
                            fontSize: "21px",
                            fontStyle: "bold",
                          }}
                        >
                          {item.variant.qty}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.variant.qty + 1)
                          }
                          className="p-3 hover:text-gray-900"
                          style={{ color: "black", fontSize: "33px" }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={() => removeFromCart(item._id.toString())}
                        className="inline-flex items-center text-sm text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </button>
                      <span className="font-semibold text-gray-900">
                        ₹{item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/3">
          <div className="mt-4 flex items-center justify-between">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Payment Terms
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedTerm}
                onChange={handlePaymentTermChange}
              >
                <FormControlLabel
                  value="0 days"
                  control={<Radio />}
                  label="0 days"
                />
                <FormControlLabel
                  value="15 days"
                  control={<Radio />}
                  label="L.C for 15 days"
                />
                <FormControlLabel
                  value="30 days"
                  control={<Radio />}
                  label="L.C for 30 days"
                />
                <FormControlLabel
                  value="45 days"
                  control={<Radio />}
                  label="L.C for 45 days"
                />
                <FormControlLabel
                  value="60 days"
                  control={<Radio />}
                  label="L.C for 60 days"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span style={{ color: "black", fontSize: "18px" }}>
                  Subtotal:
                </span>
                <span style={{ color: "black", fontSize: "18px" }}>
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span style={{ color: "black", fontSize: "18px" }}>
                  Service Fee
                </span>
                <span style={{ color: "black", fontSize: "18px" }}>
                  ₹{serviceFee}
                </span>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold">
                <span style={{ color: "black", fontSize: "18px" }}>Total</span>
                <span style={{ color: "black", fontSize: "18px" }}>
                  ₹{(subtotal + serviceFee).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
