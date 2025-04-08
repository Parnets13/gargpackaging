import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getVenderTokenFromCookie } from "../../utils/handleVenderToken";
import { jwtDecode } from "jwt-decode";

const VenderBookingHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [updateStatusDialog, setUpdateStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Mock data for when API is not available
  const mockOrders = [
    {
      _id: "order1",
      orderNumber: "ORD-001",
      customerName: "Akash",
      customerEmail: "akash@example.com",
      customerPhone: "+91 9876543210",
      orderDate: "2025-03-15T10:30:00Z",
      status: "processing",
      total: 1250.00,
      items: [
        {
          productId: "67e546d4310ff6f8c9bf735c",
          productName: "complete",
          variantName: "Standard",
          quantity: 2,
          price: 450.00,
          total: 900.00
        }
      ],
      shippingAddress: {
        street: "123 Main St",
        city: "Bangalore",
        state: "Karnataka",
        postalCode: "560001",
        country: "India"
      },
      paymentMethod: "online",
      paymentStatus: "paid"
    },
    {
      _id: "order2",
      orderNumber: "ORD-002",
      customerName: "Pintu Smith",
      customerEmail: "pint@example.com",
      customerPhone: "+91 9876543211",
      orderDate: "2050-09-18T14:45:00Z",
      status: "shipped",
      total: 750.00,
      items: [
        {
          productId: "67e55186310ff6f8c9bf75bb",
          productName: "Finally",
          variantName: "Deluxe",
          quantity: 1,
          price: 750.00,
          total: 750.00
        }
      ],
      shippingAddress: {
        street: "456 Park Ave",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001",
        country: "India"
      },
      paymentMethod: "cod",
      paymentStatus: "pending"
    },
    {
      _id: "order3",
      orderNumber: "ORD-003",
      customerName: "Rahul Kumar",
      customerEmail: "rahul@example.com",
      customerPhone: "+91 9876543212",
      orderDate: "2023-09-20T09:15:00Z",
      status: "delivered",
      total: 2100.00,
      items: [
        {
          productId: "67e546d4310ff6f8c9bf735c",
          productName: "complete",
          variantName: "Premium",
          quantity: 3,
          price: 700.00,
          total: 2100.00
        }
      ],
      shippingAddress: {
        street: "789 Gandhi Road",
        city: "Delhi",
        state: "Delhi",
        postalCode: "110001",
        country: "India"
      },
      paymentMethod: "online",
      paymentStatus: "paid"
    }
  ];

  // Fetch vendor information and orders
  useEffect(() => {
    const token = getVenderTokenFromCookie();
    console.log("Checking vendor token for booking history:", !!token);
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded vendor token:", decoded);
        setVendorId(decoded.id);
        
        // Get vendor name from local storage if available
        const vendorData = localStorage.getItem("vendorInfo");
        if (vendorData) {
          const parsedData = JSON.parse(vendorData);
          setVendorName(parsedData.name || "");
          console.log("Vendor name from localStorage:", parsedData.name);
        }
        
        fetchVendorOrders(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Authentication error. Please log in again.");
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("Please login to view booking history");
    }
  }, []);

  // Fetch orders containing vendor's products
  const fetchVendorOrders = async (vendorId) => {
    setLoading(true);
    try {
      console.log("Fetching orders for vendor ID:", vendorId);
      
      const response = await axios.get(
        "http://localhost:3003/api/order/getorder",
        {
          headers: {
            Authorization: `Bearer ${getVenderTokenFromCookie()}`
          }
        }
      );
      
      console.log("All orders:", response.data);

      // Filter orders to only include those with vendor's products
      const vendorOrders = response.data.filter(order => {
        return order.items?.some(item => {
          // Log the item for debugging
          console.log("Checking item:", item);
          
          // Check if this item belongs to the vendor
          const isVendorProduct = 
            // Check if product belongs to vendor4 (specific IDs)
            (vendorId === "67e53cc263d48ba0595a7d47" && 
             item.productId?._id === "676fd7fe335b2a164d42586b") || // Add your specific product IDs
            // Or check if the product has matching vendorId
            item.productId?.vendorId === vendorId;

          console.log("Is vendor product:", isVendorProduct);
          return isVendorProduct;
        });
      });

      console.log("Filtered vendor orders:", vendorOrders);
      
      if (vendorOrders.length > 0) {
        setOrders(vendorOrders);
        setFilteredOrders(vendorOrders);
      } else {
        console.log("No orders found for vendor");
        setOrders([]);
        setFilteredOrders([]);
        toast.info("No orders found for your products");
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Calculate vendor's total for an order
  const calculateVendorTotal = (order) => {
    if (!order.items) return 0;
    
    return order.items.reduce((total, item) => {
      // Check if this item belongs to the vendor
      const isVendorProduct = 
        (vendorId === "67e53cc263d48ba0595a7d47" && 
         item.productId?._id === "676fd7fe335b2a164d42586b") || // Add your specific product IDs
        item.productId?.vendorId === vendorId;

      if (isVendorProduct) {
        return total + (item.totalPrice || item.variant?.price * item.variant?.qty || 0);
      }
      return total;
    }, 0);
  };

  // Get vendor's items from an order
  const getVendorItems = (order) => {
    if (!order.items) return [];
    
    return order.items.filter(item => 
      (vendorId === "67e53cc263d48ba0595a7d47" && 
       item.productId?._id === "676fd7fe335b2a164d42586b") || // Add your specific product IDs
      item.productId?.vendorId === vendorId
    );
  };

  // Apply filters
  useEffect(() => {
    let filtered = orders;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          (order.orderNumber && order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.customerEmail && order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.orderDate);
        if (dateFilter === "today") {
          return orderDate >= today;
        } else if (dateFilter === "week") {
          return orderDate >= lastWeek;
        } else if (dateFilter === "month") {
          return orderDate >= lastMonth;
        }
        return true;
      });
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  // Open order details dialog
  const handleOpenOrderDetails = (order) => {
    // Currently using mock data directly - will be replaced with API call when ready
    setCurrentOrder(order);
    setOpenOrderDetails(true);
  };

  // Close order details dialog
  const handleCloseOrderDetails = () => {
    setOpenOrderDetails(false);
    setCurrentOrder(null);
  };

  // Open update status dialog
  const handleOpenUpdateStatus = (order) => {
    setCurrentOrder(order);
    setNewStatus(order.status);
    setUpdateStatusDialog(true);
  };

  // Close update status dialog
  const handleCloseUpdateStatus = () => {
    setUpdateStatusDialog(false);
  };

  // Update order status
  const handleUpdateStatus = async () => {
    try {
      console.log(`Updating order ${currentOrder._id} status to ${newStatus}`);
      
      const response = await axios.put(
        `http://localhost:3003

/api/order/updateStatus/${currentOrder._id}`,
        { 
          status: newStatus,
          vendorId: vendorId // Include vendor ID for verification
        },
        {
          headers: {
            Authorization: `Bearer ${getVenderTokenFromCookie()}`
          }
        }
      );
      
      if (response.data.success) {
        // Update local state
        const updatedOrders = orders.map((order) => {
          if (order._id === currentOrder._id) {
            return { ...order, status: newStatus };
          }
          return order;
        });

        setOrders(updatedOrders);
        setFilteredOrders(
          filteredOrders.map((order) => {
            if (order._id === currentOrder._id) {
              return { ...order, status: newStatus };
            }
            return order;
          })
        );

        toast.success("Order status updated successfully");
        handleCloseUpdateStatus();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    }
  };

  // Get status chip color based on status
  const getStatusChipColor = (status) => {
    switch (status) {
      case "processing":
        return "primary";
      case "shipped":
        return "info";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Booking History
      </Typography>
      <ToastContainer />

      {apiError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          The order API is not available yet. Showing demo data for preview purposes.
        </Alert>
      )}

      {/* Filters Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search by Order #, Customer Name or Email"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ endAdornment: <SearchIcon color="action" /> }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Order Status</InputLabel>
                <Select
              value={statusFilter}
              label="Order Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateFilter}
              label="Date Range"
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">Last 7 Days</MenuItem>
              <MenuItem value="month">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
            </Box>
          )}

      {/* Orders Table */}
      {!loading && (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Your Products Total</TableCell>
                <TableCell>Payment Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {`${order.address?.firstName || ''} ${order.address?.lastName || ''}`}
                    </TableCell>
                    <TableCell>₹{calculateVendorTotal(order).toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.type || "N/A"}
                        color={order.type === "UPI" ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status || "Pending"}
                        color={getStatusChipColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex" }}>
                        <Tooltip title="View Details">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenOrderDetails(order)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Update Status">
                          <IconButton
                            color="secondary"
                            onClick={() => handleOpenUpdateStatus(order)}
                          >
                            <ShippingIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Order Details Dialog */}
      <Dialog
        open={openOrderDetails}
        onClose={handleCloseOrderDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {currentOrder && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Order Information
                </Typography>
                <Typography>
                  <strong>Order ID:</strong> {currentOrder._id}
                </Typography>
                <Typography>
                  <strong>Date:</strong>{" "}
                  {new Date(currentOrder.orderDate).toLocaleString()}
                </Typography>
                <Typography>
                  <strong>Payment Type:</strong> {currentOrder.type}
                </Typography>
                <Typography>
                  <strong>Payment Term:</strong> {currentOrder.paymentTerm}
                </Typography>
                <Typography>
                  <strong>Status:</strong>{" "}
                  <Chip
                    label={currentOrder.status}
                    color={getStatusChipColor(currentOrder.status)}
                    size="small"
                  />
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Typography>
                  <strong>Name:</strong>{" "}
                  {`${currentOrder.address?.firstName || ''} ${currentOrder.address?.lastName || ''}`}
                </Typography>
                <Typography>
                  <strong>Address:</strong>{" "}
                  {`${currentOrder.address?.addressLine1 || ''} ${currentOrder.address?.addressLine2 || ''}`}
                </Typography>
                <Typography>
                  {`${currentOrder.address?.city || ''}, ${currentOrder.address?.state || ''} ${currentOrder.address?.pincode || ''}`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                  Your Products in This Order
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Variant</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getVendorItems(currentOrder).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.productName || item.productId?.productName}</TableCell>
                          <TableCell>{item.variant?.name || 'N/A'}</TableCell>
                          <TableCell align="right">
                            ₹{(item.variant?.price || 0).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">{item.variant?.qty || 0}</TableCell>
                          <TableCell align="right">
                            ₹{(item.totalPrice || (item.variant?.price * item.variant?.qty) || 0).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={4} align="right">
                          <strong>Total (Your Products)</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>₹{calculateVendorTotal(currentOrder).toFixed(2)}</strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOrderDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={updateStatusDialog} onClose={handleCloseUpdateStatus}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          {currentOrder && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Order: {currentOrder.orderNumber || currentOrder._id}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Current Status: {currentOrder.status || "N/A"}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>New Status</InputLabel>
                <Select
                  value={newStatus}
                  label="New Status"
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateStatus} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateStatus}
            color="primary"
            variant="contained"
          >
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VenderBookingHistory; 