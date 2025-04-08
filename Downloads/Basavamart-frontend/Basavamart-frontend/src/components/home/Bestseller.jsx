import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  Chip,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getTokenFromCookie } from "../../utils/handleToken";
import parse from "html-react-parser"; // Import the parser

const API_URL = "http://localhost:3003/api/product";

const Bestseller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = getTokenFromCookie();
      const response = await axios.get(`${API_URL}/getproduct`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(response.data.slice(0, 18));
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const ProductImagePlaceholder = () => (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey.200",
        color: "grey.500",
      }}
    >
      <Typography variant="body2">Image Not Found</Typography>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: "text.secondary",
            fontWeight: "bold",
          }}
        >
          Best Sellers
        </Typography>
        <Button
          variant="contained"
          color="warning"
          endIcon={<ArrowRight />}
          component={React.forwardRef((props, ref) => (
            <Link to="/shop" ref={ref} {...props} />
          ))}
        >
          View More
        </Button>
      </Box>

      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Discover our top-performing products that customers love
      </Typography>

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(18)).map((_, index) => (
              <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                <Skeleton
                  variant="rectangular"
                  height={300}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : products?.map((item) => (
              <Grid item key={item._id} xs={6} sm={4} md={3} lg={2}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick(item)}
                >
                  {item.variants[0]?.discount && (
                    <Chip
                      label={`${item?.variants[0]?.discount}% OFF`}
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
                    alt={item.productName}
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
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* Product Description Modal */}
      <Dialog
        open={openModal}
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
    </Container>
  );
};

export default Bestseller;