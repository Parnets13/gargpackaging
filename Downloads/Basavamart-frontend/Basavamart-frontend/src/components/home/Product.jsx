import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Box,
  Chip,
  Skeleton,
  Rating,
} from "@mui/material";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getTokenFromCookie } from "../../utils/handleToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import parse from "html-react-parser"; // Import the parser

const API_URL = "http://localhost:3003/api/product";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  });

  // Handle product click to open modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Close product description modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Handle enquiry modal
  const handleEnquiryModal = (item) => {
    setSelectedItem(item);
    setEnquiryModal(true);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle enquiry submission
  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        ...formData,
        productName: selectedItem,
      };

      const response = await axios.post(
        "http://localhost:3003/api/order/addenquiry",
        updatedFormData
      );

      if (response.status === 200) {
        toast.success("Enquiry submitted successfully");
        setFormData({ name: "", email: "", details: "" });
        setSelectedItem("");
        setEnquiryModal(false);
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Failed to submit enquiry");
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    const token = getTokenFromCookie();
    try {
      const response = await axios.get(`${API_URL}/getproduct`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setProducts(response.data.slice(0, 12));
      } else {
        console.error("Invalid data format received from API.");
      }
    } catch (error) {
      console.error(
        `Error fetching ${token ? "private" : "public"} products:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Hot Deals
        </Typography>
        <Button
          component={Link}
          to="/shop"
          variant="contained"
          color="warning"
          endIcon={<ArrowRight />}
        >
          View more
        </Button>
      </Box>

      <Grid container spacing={3}>
        {isLoading
          ? Array.from(new Array(12)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="40%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : products?.map((item) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={item._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                    cursor: "pointer",
                  }}
                  onClick={() => handleProductClick(item)}
                >
                  <Box sx={{ position: "relative", height: 200 }}>
                    {item?.variants[0]?.discount && (
                      <Chip
                        label={`${item?.variants[0]?.discount}%`}
                        color="warning"
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          zIndex: 1,
                        }}
                      />
                    )}
                    <CardMedia
                      component="img"
                      height="200"
                      image={`http://localhost:3003

${item.images[0]}`}
                      alt={`Image Not Found`}
                      sx={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `
                          <div style="display: flex; justify-content: center; align-items: center; height: 200px; background-color: #f0f0f0; color: #888;">
                            Image Not Found
                          </div>
                        `;
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item?.productName}
                    </Typography>

                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {item?.available === "No" ? (
                        <Button
                          variant="contained"
                          color="info"
                          startIcon={<ShoppingBag />}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent modal from opening
                            handleEnquiryModal(item?.productName);
                          }}
                        >
                          Enquiry
                        </Button>
                      ) : (
                        <>
                          <Typography variant="h6">
                            ₹{item?.variants[0]?.finalPrice.toFixed(2)}
                          </Typography>
                          <Button
                            variant="contained"
                            color="warning"
                            startIcon={<ShoppingBag />}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent modal from opening
                              // Add to cart logic here
                            }}
                          >
                            Add
                          </Button>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* Product Description Modal */}
      <Dialog
        open={!!selectedProduct}
        onClose={handleCloseModal}
        maxWidth="lg" // Make the modal larger
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3, // Rounded corners
            maxWidth: "90%", // Wider modal
            height: "auto", // Auto height based on content
            maxHeight: "90vh", // Limit height to 90% of the viewport
            overflowY: "auto", // Add scroll if content is too long
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "2rem", // Larger title
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "primary.main",
            color: "white",
            py: 3,
          }}
        >
          {selectedProduct?.productName}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {/* Product Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "grey.100",
                }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:3003

${selectedProduct?.images[0]}`}
                  alt={selectedProduct?.productName}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "500px", // Limit image height
                    objectFit: "contain", // Ensure the image fits well
                  }}
                />
              </Box>
            </Grid>

            {/* Product Details Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
                >
                  Product Details
                </Typography>
                {/* Use html-react-parser to render the HTML content */}
                {selectedProduct?.productDescription &&
                  parse(selectedProduct.productDescription)}
              </Box>

              {/* Price and Discount Section */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Price:
                </Typography>
                <Typography variant="h5" color="primary">
                  ₹{selectedProduct?.variants[0]?.finalPrice.toFixed(2)}
                </Typography>
                {selectedProduct?.variants[0]?.discount && (
                  <Chip
                    label={`${selectedProduct?.variants[0]?.discount}% OFF`}
                    color="success"
                    size="medium"
                  />
                )}
              </Box>

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                color="warning"
                startIcon={<ShoppingBag />}
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: 2,
                }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enquiry Modal */}
      <Dialog
        open={enquiryModal}
        onClose={() => setEnquiryModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Submit an Enquiry</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please fill out the form below to submit your enquiry. We will get
            back to you soon.
          </DialogContentText>
          <Box component="form" onSubmit={handleSubmitEnquiry}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="productName"
              label="Product Name"
              type="text"
              fullWidth
              variant="outlined"
              value={selectedItem}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="details"
              label="Details"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={formData.details}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <DialogActions>
              <Button onClick={() => setEnquiryModal(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Product;