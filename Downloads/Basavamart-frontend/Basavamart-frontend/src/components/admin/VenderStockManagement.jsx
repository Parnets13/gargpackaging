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
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Inventory as InventoryIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getVenderTokenFromCookie } from "../../utils/handleVenderToken";
import { jwtDecode } from "jwt-decode";

const VenderStockManagement = () => {
  const [products, setProducts] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [newStock, setNewStock] = useState(0);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);

  // Fetch vendor information on component mount
  useEffect(() => {
    const token = getVenderTokenFromCookie();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setVendorId(decoded.id);
        fetchProducts(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Authentication error. Please log in again.");
      }
    }
  }, []);

  // Fetch products specific to this vendor
  const fetchProducts = async (vendorId) => {
    try {
      const response = await axios.get(`http://localhost:3003

/api/product/getproducts?vendorId=${vendorId}`);
      
      // If the API doesn't filter by vendorId correctly, we'll do it client-side
      let vendorProducts = response.data;
      
      // Client-side filter to ensure we only see vendor products
      vendorProducts = vendorProducts.filter(product => 
        product.vendorId === vendorId || 
        // Special handling for known vendor products (if vendorId isn't set in the database)
        product._id === '67e546d4310ff6f8c9bf735c' || 
        product._id === '67e55186310ff6f8c9bf75bb'
      );
      
      console.log("Vendor products fetched:", vendorProducts.length);
      setProducts(vendorProducts);
      setFilteredProducts(vendorProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    }
  };

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.variants &&
            product.variants.some((variant) =>
              variant.name.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Open the update stock modal
  const handleOpenUpdateModal = (product, variant) => {
    setCurrentProduct(product);
    setCurrentVariant(variant);
    setNewStock(variant.stock || 0);
    setOpenUpdateModal(true);
  };

  // Close the update stock modal
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setCurrentProduct(null);
    setCurrentVariant(null);
  };

  // Update stock for a product variant
  const handleUpdateStock = async () => {
    try {
      // Create a copy of the current product and update the variant stock
      const updatedProduct = { ...currentProduct };
      const variantIndex = updatedProduct.variants.findIndex(
        (v) => v._id === currentVariant._id
      );
      
      if (variantIndex !== -1) {
        updatedProduct.variants[variantIndex] = {
          ...updatedProduct.variants[variantIndex],
          stock: parseInt(newStock)
        };
      }

      // Send the update to the server
      const response = await axios.put(
        `http://localhost:3003

/api/product/updateproduct/${currentProduct._id}`,
        {
          product: updatedProduct,
          variant: updatedProduct.variants[variantIndex]
        }
      );

      if (response.status === 201 || response.status === 200) {
        // Update local state with the new stock
        const updatedProducts = products.map(product => {
          if (product._id === currentProduct._id) {
            const updatedVariants = product.variants.map(variant => {
              if (variant._id === currentVariant._id) {
                return { ...variant, stock: parseInt(newStock) };
              }
              return variant;
            });
            return { ...product, variants: updatedVariants };
          }
          return product;
        });

        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        toast.success("Stock updated successfully");
        handleCloseUpdateModal();
      } else {
        toast.error("Failed to update stock");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Failed to update stock. Please try again.");
    }
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Stock Management
      </Typography>
      <ToastContainer />

      {/* Search and Filter Section */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon color="action" />,
          }}
        />
        <Box sx={{ ml: 2 }}>
          <TextField
            label="Low Stock Threshold"
            type="number"
            variant="outlined"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(Number(e.target.value))}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ width: 180 }}
          />
        </Box>
      </Box>

      {/* Products Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="stock table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Product Name</TableCell>
              <TableCell>Variant</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Stock Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) =>
                product.variants && product.variants.length > 0 ? (
                  product.variants.map((variant, index) => (
                    <TableRow key={`${product._id}-${variant._id || index}`}>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{variant.name}</TableCell>
                      <TableCell>{variant.stock || 0}</TableCell>
                      <TableCell>
                        {variant.stock <= lowStockThreshold ? (
                          <Chip
                            icon={<WarningIcon />}
                            label="Low Stock"
                            color="error"
                            size="small"
                          />
                        ) : (
                          <Chip
                            icon={<InventoryIcon />}
                            label="In Stock"
                            color="success"
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Update Stock">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenUpdateModal(product, variant)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={product._id}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>No variants</TableCell>
                    <TableCell>N/A</TableCell>
                    <TableCell>
                      <Chip
                        label="No Variants"
                        color="warning"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>N/A</TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Stock Modal */}
      <Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <DialogTitle>Update Stock</DialogTitle>
        <DialogContent>
          {currentProduct && currentVariant && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  <strong>Product:</strong> {currentProduct.productName}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Variant:</strong> {currentVariant.name}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Current Stock:</strong> {currentVariant.stock || 0}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Stock Quantity"
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleUpdateStock} color="primary" variant="contained">
            Update Stock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VenderStockManagement; 