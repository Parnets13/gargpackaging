// import React, { useEffect, useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Divider,
//   Card,
//   CardContent,
//   CardMedia,
//   List,
//   ListItem,
//   Stack,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import {
//   Truck,
//   CreditCard,
//   ChevronDown,
//   MapPin,
//   ShoppingCart,
//   Package,
//   ReceiptIndianRupee,
// } from "lucide-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// const API_URL = "http://localhost:3003/api/address";

// const Checkout = () => {
//   const location = useLocation();
//   const { subtotal, selectedTerm } = location.state || {};
//   const [addresses, setAddresses] = useState([]);
//   const [paymentModal, setPaymentModal] = useState(false);
//   const [paymentType, setPaymentType] = useState("");
//   const [dailogSubTotal, setDailogSubTotal] = useState(0);
//   const [address, setAddress] = useState("");
//   const [orderItem, setOrderItem] = useState([]);
//   const [carts, setCarts] = useState({ items: [] });
//   const [selectedTerms, setSelectedTerms] = useState("0 days");
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const navigate = useNavigate();

//   const handleAddressChange = (event) => {
//     const selectedValue = event.target.value;
//     if (selectedValue === "new") {
//       navigate("/MyAccountOrder");
//     } else {
//       setSelectedAddress(selectedValue);
//     }
//   };

//   const handlePaymentModal = (subtotal, items, address, selectedTerm) => {
//     setSelectedTerms(selectedTerm);
//     setDailogSubTotal(subtotal);
//     setAddress(address);
//     setOrderItem(items);
//     setPaymentModal(true);
//   };
//   const handleClosePaymentModal = () => setPaymentModal(false);

//   const handleSubmitOrder = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("login first");
//       navigate("/MyAccountSignIn");
//     }
//     try {
//       const response = await axios.post(
//         "http://localhost:3003/api/order/addorder",
//         {
//           items: orderItem,
//           address: address,
//           type: paymentType,
//           paymentTerm: selectedTerms,
//           price: dailogSubTotal + 3,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (response.status === 201) {
//         setOrderItem([]);
//         setPaymentType("");
//         setDailogSubTotal(0);
//         setAddress("");
//         alert("Order placed successfully");
//       } else {
//         alert("Failed to place order");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const fetchAddress = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("login first");
//       navigate("/MyAccountSignIn");
//     }
//     try {
//       console.log(token);
//       const response = await fetch(`${API_URL}/getAddress`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const addresses = await response.json();
//         setAddresses(addresses);
//         console.log(addresses);
//       } else if (response.status === 404) {
//         alert("Add Address");
//       } else {
//         console.error("Failed to fetch addresses");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const fetchCart = async () => {
//     const token = localStorage.getItem("token");
//     const response = await axios.get("http://localhost:3003/api/cart/getCart", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setCarts(response.data);
//   };

//   useEffect(() => {
//     fetchAddress();
//     fetchCart();
//   }, []);

//   return (
//     <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
//       <Container maxWidth="lg">
//         <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1 }}>
//           <ShoppingCart size={28} />
//           <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
//             Checkout
//           </Typography>
//         </Box>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={7}>
//             <Paper sx={{ p: 3, mb: 3 }}>
//               <Box
//                 sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}
//               >
//                 <Truck size={24} />
//                 <Typography variant="h6">Delivery Address</Typography>
//               </Box>
//               <FormControl fullWidth sx={{ mb: 3 }}>
//                 <InputLabel>Select Address</InputLabel>
//                 <Select
//                   value={selectedAddress}
//                   onChange={handleAddressChange}
//                   label="Select Address"
//                   IconComponent={(props) => <ChevronDown {...props} />}
//                 >
//                   {addresses.map((address) => {
//                     return (
//                       <MenuItem key={address._id} value={address._id}>
//                         <Box
//                           sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                         >
//                           <MapPin size={20} />
//                           {address.addressLine1}, {address.addressLine2},{" "}
//                           {address.city}, {address.state}
//                         </Box>
//                       </MenuItem>
//                     );
//                   })}
//                   <MenuItem value="new">
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <AddBoxIcon size={20} />
//                       Add New Address
//                     </Box>
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={5}>
//             <Paper sx={{ p: 3 }}>
//               <Box
//                 sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}
//               >
//                 <Package size={24} />
//                 <Typography variant="h6">Order Summary</Typography>
//               </Box>
//               <List sx={{ mb: 3 }}>
//                 {carts.items.map((item, index) => (
//                   <React.Fragment key={item._id}>
//                     <ListItem alignItems="flex-start" sx={{ py: 2 }}>
//                       <Card
//                         sx={{
//                           display: "flex",
//                           width: "100%",
//                           boxShadow: "none",
//                           gap: 1,
//                         }}
//                       >
//                         <CardMedia
//                           component="img"
//                           sx={{
//                             width: 100,
//                             height: 120,
//                             objectFit: "cover",
//                             borderRadius: 1,
//                           }}
//                           image={item.productImg}
//                           alt={item.productName}
//                         />
//                         <CardContent sx={{ flex: 1 }}>
//                           <Box
//                             sx={{
//                               display: "flex-column",
//                               justifyContent: "space-between",
//                             }}
//                           >
//                             <Typography variant="subtitle1">
//                               {item.productName}
//                             </Typography>
//                             <div>
//                               <p className="text-gray-500">
//                                 Size: {item.variant.size} <br />
//                                 Quantity: {item.variant.quantity}
//                               </p>
//                             </div>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 0.5,
//                               }}
//                             >
//                               <ReceiptIndianRupee size={16} />
//                               <Typography variant="subtitle1">
//                                 {item.totalPrice}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </CardContent>
//                       </Card>
//                     </ListItem>
//                     {index < carts.items.length - 1 && <Divider />}
//                   </React.Fragment>
//                 ))}
//               </List>
//               <Divider sx={{ my: 2 }} />
//               <Stack spacing={2}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Typography color="text.secondary">Pament Terms: </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Typography>{selectedTerm}</Typography>
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Typography color="text.secondary">Subtotal: </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <ReceiptIndianRupee size={16} />
//                     <Typography>{subtotal}</Typography>
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Typography color="text.secondary">Service Fee: </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <ReceiptIndianRupee size={16} />
//                     <Typography>3</Typography>
//                   </Box>
//                 </Box>
//                 <Divider />
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Typography variant="h6">Total: </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <ReceiptIndianRupee size={20} />
//                     <Typography variant="h6">
//                       {(subtotal + 3).toLocaleString()}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Stack>
//               <Button
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 sx={{
//                   mt: 3,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   backgroundColor: "#452a6f",
//                 }}
//                 onClick={() =>
//                   handlePaymentModal(
//                     subtotal,
//                     selectedAddress,
//                     carts.items,
//                     selectedTerm
//                   )
//                 }
//               >
//                 <CreditCard size={20} />
//                 Place Order
//               </Button>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//       <Dialog
//         open={paymentModal}
//         onClose={handleClosePaymentModal}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Select Payment Method</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmitOrder}>
//             <RadioGroup
//               value={paymentType}
//               onChange={(e) => setPaymentType(e.target.value)}
//               sx={{ display: "flex", flexDirection: "row", gap: 2 }}
//             >
//               <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
//               <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
//               <FormControlLabel
//                 value="Card"
//                 control={<Radio />}
//                 label="Debit/Credit Card"
//               />
//             </RadioGroup>

//             {paymentType === "UPI" && (
//               <TextField
//                 margin="dense"
//                 label="Enter UPI ID"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 required
//               />
//             )}

//             {paymentType === "Card" && (
//               <>
//                 <TextField
//                   margin="dense"
//                   label="Card Number"
//                   type="text"
//                   fullWidth
//                   variant="outlined"
//                   required
//                 />
//                 <TextField
//                   margin="dense"
//                   label="Expiry Date (MM/YY)"
//                   type="text"
//                   fullWidth
//                   variant="outlined"
//                   required
//                 />
//                 <TextField
//                   margin="dense"
//                   label="CVV"
//                   type="password"
//                   fullWidth
//                   variant="outlined"
//                   required
//                 />
//               </>
//             )}
//             {paymentType === "Cash" && (
//               <Box sx={{ mt: 2 }}>
//                 <Typography></Typography>
//               </Box>
//             )}
//             <Divider sx={{ my: 2 }} />
//             <Stack spacing={2}>
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Typography color="text.secondary">Subtotal: </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <ReceiptIndianRupee size={16} />
//                   <Typography>{dailogSubTotal.toLocaleString()}</Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Typography color="text.secondary">Service Fee: </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <ReceiptIndianRupee size={16} />
//                   <Typography>3</Typography>
//                 </Box>
//               </Box>
//               <Divider />
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Typography variant="h6">Total: </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <ReceiptIndianRupee size={20} />
//                   <Typography variant="h6">
//                     {(dailogSubTotal + 3).toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Button type="submit" color="primary" variant="contained">
//                 Confirm and Place Order
//               </Button>
//               <Button onClick={handleClosePaymentModal} color="secondary">
//                 Cancel
//               </Button>
//             </Stack>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default Checkout;

import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import {
  Truck,
  CreditCard,
  ChevronDown,
  MapPin,
  ShoppingCart,
  Package,
  ReceiptIndianRupee,
} from "lucide-react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { getTokenFromCookie } from "../utils/handleToken";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: "http://localhost:3003/api",
  timeout: 5000,
});

// Add request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Custom hooks for data fetching
const useAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/address/getAddress");
      setAddresses(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  return { addresses, loading, error, fetchAddresses };
};

const useCart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/cart/getCart");
      setCart(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  return { cart, loading, error, fetchCart };
};

// Validation utilities
const validatePaymentDetails = (paymentType, details) => {
  const errors = {};

  if (paymentType === "UPI") {
    if (!details.upiId) {
      errors.upiId = "UPI ID is required";
    } else if (!/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/.test(details.upiId)) {
      errors.upiId = "Invalid UPI ID format";
    }
  } else if (paymentType === "Card") {
    if (!details.cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(details.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Invalid card number";
    }

    if (!details.expiryDate) {
      errors.expiryDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(details.expiryDate)) {
      errors.expiryDate = "Invalid expiry date format (MM/YY)";
    }

    if (!details.cvv) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(details.cvv)) {
      errors.cvv = "Invalid CVV";
    }
  }

  return errors;
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subtotal = 0, selectedTerm = "0 days" } = location.state || {};

  // Custom hooks
  const {
    addresses,
    loading: addressesLoading,
    error: addressesError,
    fetchAddresses,
  } = useAddresses();
  const { cart, loading: cartLoading, error: cartError, fetchCart } = useCart();

  // Component state
  const [selectedAddress, setSelectedAddress] = useState();
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Effects
  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/MyAccountSignIn");
      return;
    }
    fetchAddresses();
    fetchCart();
  }, []);

  // Handlers
  const handleAddressChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "new") {
      navigate("/MyAccountOrder", { state: { activeSection: "address" } });
    } else {
      setSelectedAddress(selectedValue);
      setFormErrors({ ...formErrors, address: "" });
    }
  };

  const handlePaymentModal = () => {
    if (!selectedAddress) {
      setFormErrors({
        ...formErrors,
        address: "Please select a delivery address",
      });
      return;
    }
    setPaymentModal(true);
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
    setPaymentDetails({
      upiId: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    setFormErrors({});
  };

  const handlePaymentDetailsChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    // Validate payment details
    const validationErrors = validatePaymentDetails(
      paymentType,
      paymentDetails
    );
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cart.items,
        address: selectedAddress,
        type: paymentType,
        paymentTerm: selectedTerm,
        price: (subtotal + 3).toFixed(2),
      };

      const response = await apiClient.post("/order/addorder", orderData);

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: "Order placed successfully!",
          severity: "success",
        });
        const res = await apiClient.delete("/cart/deleteUserCart");
        if (res.status === 200) {
          setPaymentModal(false);
          navigate("/MyAccountOrder");
        }
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to place order",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Loading states
  if (addressesLoading || cartLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 1 }}>
          <ShoppingCart size={28} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Checkout
          </Typography>
        </Box>

        {/* Error Alerts */}
        {(addressesError || cartError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {addressesError || cartError}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Delivery Address Section */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}
              >
                <Truck size={24} />
                <Typography variant="h6">Delivery Address</Typography>
              </Box>
              <FormControl fullWidth error={Boolean(formErrors.address)}>
                <InputLabel>Select Address</InputLabel>
                <Select
                  value={selectedAddress}
                  onChange={handleAddressChange}
                  label="Select Address"
                  IconComponent={ChevronDown}
                >
                  {addresses.map((address) => (
                    <MenuItem key={address._id} value={address._id}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <MapPin size={20} />
                        {`${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}`}
                      </Box>
                    </MenuItem>
                  ))}
                  <MenuItem value="new">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AddBoxIcon />
                      Add New Address
                    </Box>
                  </MenuItem>
                </Select>
                {formErrors.address && (
                  <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                    {formErrors.address}
                  </Typography>
                )}
              </FormControl>
            </Paper>
          </Grid>

          {/* Order Summary Section */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}
              >
                <Package size={24} />
                <Typography variant="h6">Order Summary</Typography>
              </Box>

              {/* Cart Items List */}
              <List sx={{ mb: 3 }}>
                {cart.items.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                      <Card
                        sx={{
                          display: "flex",
                          width: "100%",
                          boxShadow: "none",
                          gap: 1,
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: 100,
                            height: 120,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                          image={`http://localhost:3003

${item.productImg}`}
                          alt={item.productName}
                        />
                        <CardContent sx={{ flex: 1 }}>
                          <Typography variant="subtitle1">
                            {item.productName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Size: {item.variant.name}
                            <br />
                            Quantity: {item.variant.qty}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              mt: 1,
                            }}
                          >
                            <ReceiptIndianRupee size={16} />
                            <Typography>{item.totalPrice}</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </ListItem>
                    {index < cart.items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>

              {/* Order Summary */}
              <Divider sx={{ my: 2 }} />
              <Stack spacing={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">
                    Payment Terms:
                  </Typography>
                  <Typography>{selectedTerm}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Subtotal: </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ReceiptIndianRupee size={16} />
                    <Typography>{subtotal.toFixed(2)}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Service Fee: </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ReceiptIndianRupee size={16} />
                    <Typography>3</Typography>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Total: </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ReceiptIndianRupee size={20} />
                    <Typography variant="h6">
                      {(subtotal + 3).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              {/* Place Order Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "#452a6f",
                }}
                onClick={handlePaymentModal}
                disabled={loading}
              >
                <CreditCard size={20} />
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Payment Modal */}
      <Dialog
        open={paymentModal}
        onClose={() => setPaymentModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitOrder}>
            {/* Continuing from the Payment Modal RadioGroup */}
            <RadioGroup
              value={paymentType}
              onChange={handlePaymentTypeChange}
              sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
            >
              <FormControlLabel
                value="UPI"
                control={<Radio />}
                label="UPI Payment"
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  p: 1,
                  width: "100%",
                }}
              />
              <FormControlLabel
                value="Card"
                control={<Radio />}
                label="Credit/Debit Card"
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  p: 1,
                  width: "100%",
                }}
              />
              <FormControlLabel
                value="Cash"
                control={<Radio />}
                label="Cash on Delivery"
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  p: 1,
                  width: "100%",
                }}
              />
            </RadioGroup>

            {/* UPI Payment Form */}
            {paymentType === "UPI" && (
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Enter UPI ID"
                  name="upiId"
                  value={paymentDetails.upiId}
                  onChange={handlePaymentDetailsChange}
                  fullWidth
                  required
                  error={Boolean(formErrors.upiId)}
                  helperText={formErrors.upiId}
                  placeholder="username@upi"
                  sx={{ mb: 2 }}
                />
                <Typography variant="caption" color="text.secondary">
                  Please enter a valid UPI ID (e.g., username@upi)
                </Typography>
              </Box>
            )}

            {/* Card Payment Form */}
            {paymentType === "Card" && (
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Card Number"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentDetailsChange}
                  fullWidth
                  required
                  error={Boolean(formErrors.cardNumber)}
                  helperText={formErrors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  sx={{ mb: 2 }}
                  inputProps={{
                    maxLength: 19,
                    pattern: "\\d*",
                    onChange: (e) => {
                      // Format card number with spaces
                      const value = e.target.value.replace(/\s/g, "");
                      const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
                      setPaymentDetails({
                        ...paymentDetails,
                        cardNumber: formatted,
                      });
                    },
                  }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Expiry Date"
                      name="expiryDate"
                      value={paymentDetails.expiryDate}
                      onChange={handlePaymentDetailsChange}
                      fullWidth
                      required
                      error={Boolean(formErrors.expiryDate)}
                      helperText={formErrors.expiryDate}
                      placeholder="MM/YY"
                      inputProps={{
                        maxLength: 5,
                        pattern: "\\d*/\\d*",
                        onChange: (e) => {
                          // Format expiry date
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length >= 2) {
                            const formatted = `${value.slice(
                              0,
                              2
                            )}/${value.slice(2)}`;
                            setPaymentDetails({
                              ...paymentDetails,
                              expiryDate: formatted,
                            });
                          } else {
                            setPaymentDetails({
                              ...paymentDetails,
                              expiryDate: value,
                            });
                          }
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="CVV"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handlePaymentDetailsChange}
                      fullWidth
                      required
                      error={Boolean(formErrors.cvv)}
                      helperText={formErrors.cvv}
                      type="password"
                      inputProps={{
                        maxLength: 4,
                        pattern: "\\d*",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Cash on Delivery Message */}
            {paymentType === "Cash" && (
              <Box sx={{ mb: 3 }}>
                <Alert severity="info">
                  Pay with cash upon delivery. Our delivery partner will collect
                  the payment at the time of delivery.
                </Alert>
              </Box>
            )}

            {/* Order Summary in Modal */}
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Items Total:</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ReceiptIndianRupee size={16} />
                    <Typography>{subtotal.toFixed(2)}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Service Fee:</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ReceiptIndianRupee size={16} />
                    <Typography>3</Typography>
                  </Box>
                </Box>
                {paymentType === "Cash" && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography color="text.secondary">
                      Cash Handling Fee:
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <ReceiptIndianRupee size={16} />
                      <Typography>2</Typography>
                    </Box>
                  </Box>
                )}
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Total Payable:</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <ReceiptIndianRupee size={20} />
                    <Typography variant="h6">
                      {(
                        subtotal +
                        3 +
                        (paymentType === "Cash" ? 2 : 0)
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                onClick={() => setPaymentModal(false)}
                variant="outlined"
                color="secondary"
                fullWidth
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!paymentType || loading}
                sx={{ backgroundColor: "#452a6f" }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    Processing...
                  </Box>
                ) : (
                  "Confirm Payment"
                )}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Checkout;
