import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Divider, message, Button } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Tabs as MuiTabs,
  Tab,
  Typography,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import {
  ShoppingBag,
  Package,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { getTokenFromCookie } from "../utils/handleToken";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Styled components for Material UI
const StyledTab = styled(Tab)({
  textTransform: "none",
});

const ShopDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentMainImage, setCurrentMainImage] = useState(0);
  const sliderRef = useRef(null);

  const handleAddToCart = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      message.error("You need to log in first!");
      setLoading(false);
      return;
    }
    if (Object.keys(selectedVariants).length === 0) {
      message.error("Please select a variant before adding to the cart!");
      return;
    }
    try {
      const payload = {
        cartItems: Object.values(selectedVariants).map((variant) => ({
          productId: product._id,
          productName: product.productName,
          productImg: product.images[0],
          variant: {
            hsn: variant.hsn,
            name: variant.name,
            price: variant.finalPrice,
            qty: variant.qty,
            tax: variant.tax,
          },
          totalPrice: variant.finalPrice * variant.qty,
        })),
      };
      const response = await axios.post(
        "http://localhost:3003/api/cart/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Product added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("Failed to add product to cart");
    }
    setLoading(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  const handleVariantSelect = (variant) => {
    if (selectedVariants[variant.name]) {
      setSelectedVariants((prev) => {
        const updatedVariants = { ...prev };
        delete updatedVariants[variant.name];
        return updatedVariants;
      });
    } else {
      setSelectedVariants((prev) => ({
        ...prev,
        [variant.name]: { ...variant, qty: 1 },
      }));
    }
  };

  const handleqtyChange = (name, increment) => {
    setSelectedVariants((prev) => {
      const currentqty = prev[name]?.qty || 0;
      const newqty = Math.max(0, currentqty + increment);

      if (newqty === 0) {
        const updatedVariants = { ...prev };
        delete updatedVariants[name];
        return updatedVariants;
      }

      return {
        ...prev,
        [name]: {
          ...prev[name],
          qty: newqty,
        },
      };
    });
  };

  const handleDownloadCatalog = async () => {
    try {
      console.log(product._id);
      const response = await axios.get(
        `http://localhost:3003

/api/product/download/${product._id}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${product.productName}-catalog.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading catalog:", error);
      message.error("Failed to download catalog");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003

/api/product/getproduct/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const totalPrice = Object.values(selectedVariants).reduce(
    (sum, variant) => sum + variant.finalPrice * variant.qty,
    0
  );

  const imageSliderSettings = {
    ref: sliderRef,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(4, product.images.length),
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    centerMode: false,
    variableWidth: true,
    centerPadding: "10px",
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: Math.min(3, product.images.length),
    //       variableWidth: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: Math.min(3, product.images.length),
    //       variableWidth: true,
    //     },
    //   },
    // ],
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      <Link to="/shop">
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <ArrowLeft />
          </IconButton>
          <Typography variant="subtitle1" color="text.secondary">
            Back to Shop
          </Typography>
        </Box>
      </Link>

      <Box
        sx={{ display: "grid", gridTemplateColumns: { md: "2fr 1fr" }, gap: 3 }}
      >
        {/* Image Gallery Section */}
        <Box
          sx={{
            width: "100% !important",
            maxWidth: "100%",
            position: "relative",
            "& .slick-list": {
              margin: "0 -10px",
              maxWidth: "100%",
              overflow: "hidden",
            },
            "& .slick-track": {
              display: "flex",
              gap: "10px",
            },
            "& .slick-slide": {
              width: "100px !important", // Force consistent width
              padding: "0 5px",
              boxSizing: "border-box",
            },
            border: "1px solid #e0e0e0",
            borderRadius: 2,
          }}
        >
          {/* Main Image */}
          <Box
            sx={{
              mb: 2,
              width: "100% !important",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 1,
            }}
          >
            <img
              src={`http://localhost:3003

${product.images[currentMainImage]}`}
              alt="Product Main Img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Horizontal Thumbnail Slider */}
          <Box
            sx={{
              width: "100%",
              position: "relative",
              "& .slick-list": {
                margin: "0 -10px",
              },
              "& .slick-slide": {
                padding: "0 10px",
                boxSizing: "border-box",
              },
              border: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          >
            <Slider {...imageSliderSettings}>
              {product.images.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentMainImage(index)}
                  sx={{
                    cursor: "pointer",
                    opacity: currentMainImage === index ? 1 : 0.5,
                    width: "100px",
                    height: "100px",
                    display: "flex !important",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                  }}
                >
                  <img
                    src={`http://localhost:3003

${img}`}
                    alt={`Product thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>

        {/* Product Information Section */}
        <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 3, p: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {product?.productName}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#EC520A" }}
            >
              ₹{product?.variants[0]?.finalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              Select Variant
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {product?.variants?.map((variant) => (
                <Chip
                  key={variant.hsn}
                  label={variant.name}
                  onClick={() => handleVariantSelect(variant)}
                  color={selectedVariants[variant.name] ? "primary" : "default"}
                  sx={{ borderRadius: 1, "&:hover": { boxShadow: 1 } }}
                />
              ))}
            </Box>
          </Box>

          {/* Qty Counters for Selected Variants */}
          {Object.values(selectedVariants).map((variant) => (
            <Box
              key={variant.name}
              sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}
            >
              <Typography variant="body1">{variant?.name}:</Typography>
              <IconButton onClick={() => handleqtyChange(variant.name, -1)}>
                <Minus />
              </IconButton>
              <Typography variant="h6">{variant?.qty}</Typography>
              <IconButton onClick={() => handleqtyChange(variant?.name, 1)}>
                <Plus />
              </IconButton>
              <Typography variant="body1">
                Price: ₹{(variant?.finalPrice * variant?.qty).toFixed(2)}
              </Typography>
            </Box>
          ))}

          {totalPrice === 0 ? (
            ""
          ) : (
            <Typography variant="h6" sx={{ my: 2 }}>
              Total Price: ₹{totalPrice.toFixed(2)}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 2, my: 3 }}>
            <Button
              type="primary"
              name="large"
              fullWidth
              icon={<ShoppingBag />}
              onClick={handleAddToCart}
              loading={loading}
              disabled={loading}
              style={{ flex: 1, height: 48, backgroundColor: "#EC520A" }}
            >
              Add to Cart
            </Button>
            <Button
              type="primary"
              name="large"
              icon={<ShoppingBag />}
              style={{ flex: 1, height: 48 }}
              onClick={handleDownloadCatalog}
            >
              Download Catalog
            </Button>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              my: 3,
            }}
          >
            {[
              { icon: <Package />, text: "Free Shipping" },
              { icon: <Truck />, text: "Fast Delivery" },
              { icon: <Shield />, text: "Warranty" },
            ].map((feature, index) => (
              <Paper key={index} sx={{ p: 2, textAlign: "center" }}>
                {feature.icon}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {feature.text}
                </Typography>
              </Paper>
            ))}
          </Box>
          {/* Product Information Tabs */}
          <Box sx={{ width: "100%" }}>
            <MuiTabs value={activeTab} onChange={handleTabChange}>
              <StyledTab label="Description" />
              <StyledTab label="Specifications" />
            </MuiTabs>

            <TabPanel value={activeTab} index={0}>
              <p
                dangerouslySetInnerHTML={{ __html: product.productDescription }}
              ></p>
              <p>Video link: <a href={`${product.video}`} target="_blank" rel="noreferrer" >{product.video}</a> </p>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom: 1,
                  borderColor: "divider",
                  color: "black",
                }}
              >
                <Typography variant="body2">Brand</Typography>
                <Typography variant="body2">{product?.brand?.name}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom: 1,
                  borderColor: "divider",
                  color: "black",
                }}
              >
                <Typography variant="body2">Category</Typography>
                <Typography variant="body2">{product?.category?.name}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom: 1,
                  borderColor: "divider",
                  color: "black",
                }}
              >
                <Typography variant="body2">SubCategory</Typography>
                <Typography variant="body2">
                  {product?.subcategory?.name}
                </Typography>
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopDetail;
