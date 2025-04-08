import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Updated import
import axios from "axios";
import { toast } from "react-toastify";
import { getTokenFromCookie } from "../utils/handleToken";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  List,
  CardActionArea,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  TextField,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import {
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  Search as SearchIcon,
} from "lucide-react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";

const API_URL = "http://localhost:3003/api/product";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 200,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const Shop = () => {
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productName: "",
    details: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brandSearch = queryParams.get("brand");
  const categorySearch = queryParams.get("category");

  useEffect(() => {
    // Pre-select brand and category based on query parameters
    if (brandSearch) {
      setSelectedBrand(brandSearch);
      setExpandedBrand(brandSearch);
    }
    if (categorySearch) {
      setSelectedCategory(categorySearch);
      setExpandedCategory(categorySearch);
    }
  }, [brandSearch, categorySearch]);

  useEffect(() => {
    // Fetch products based on brand or category
    const fetchProductsBybrcat = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003

/api/product/getproductsbybrcat`,
          { params: { brandSearch, categorySearch } }
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductsBybrcat();
  }, [brandSearch, categorySearch]);

  const handleEnquiryModal = (name) => {
    setSelectedItem(name);
    setEnquiryModal(true);
  };

  const handleCloseModal = () => setEnquiryModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.details) {
      toast.error("All fields are required!");
      return;
    }
    const enquiryData = {
      ...formData,
      productName: selectedItem,
    };
    try {
      const response = await axios.post(
        "http://localhost:3003/api/order/addenquiry",
        enquiryData
      );
      if (response.status === 200) {
        toast.success("Enquiry submitted successfully");
        setFormData({ name: "", email: "", productName: "", details: "" });
      }
      handleCloseModal();
    } catch (error) {
      console.error("Failed to submit enquiry");
    }
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === selectedBrand ? null : brand);
    setExpandedBrand(expandedBrand === brand ? null : brand);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setExpandedCategory(expandedCategory === category ? null : category);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(
      subCategory === selectedSubCategory ? null : subCategory
    );
    setExpandedSubCategory(
      expandedSubCategory === subCategory ? null : subCategory
    );
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      fetchProducts();
    } else {
      const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  };

  const handleBrandSearchChange = (e) => {
    const query = e.target.value;
    const filteredBrands = brands.filter((brand) =>
      brand.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBrands(filteredBrands);
  };

  const sortedProducts = [...products]
    .filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "lowToHigh") {
        return a.variants[0].finalPrice - b.variants[0].finalPrice;
      } else if (sort === "highToLow") {
        return b.variants[0].finalPrice - a.variants[0].finalPrice;
      }
      return 0;
    });

  const handleClick = (id) => {
    navigate(`/shop-detail/${id}`);
  };

  const fetchProducts = async (query) => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        const response = await axios.get(`${API_URL}/getUserProduct`);
        setProducts(response.data);
      } else {
        const response = await axios.get(`${API_URL}/getproduct`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchProductsByBrand = async (brand, category, subcategory) => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        const response = await axios.get(`${API_URL}/getUserProductByBrand`, {
          params: { brand, category, subcategory },
        });
        if (response.status === 404) {
          setProducts([]);
        } else {
          setProducts(response.data);
        }
      } else {
        const response = await axios.get(`${API_URL}/getproductbybrand`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { brand, category, subcategory },
        });
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [brandRes, categoryRes, subCategoryRes] = await Promise.all([
          axios.get(`${API_URL}/getbrand`),
          axios.get(`${API_URL}/getcategory`),
          axios.get(`${API_URL}/getsubcategory`),
        ]);
        setBrands(brandRes.data);
        setFilteredBrands(brandRes.data);
        setCategories(categoryRes.data);
        setSubCategories(subCategoryRes.data);
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProductsByBrand(selectedBrand, selectedCategory, selectedSubCategory);
  }, [selectedBrand, selectedCategory, selectedSubCategory]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box role="presentation" sx={{ mb: 3 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </Link>
              <Typography color="text.primary">Shop</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom style={{ color: "#452a6f" }}>
              Our Brands
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Search brands..."
              size="small"
              fullWidth
              onChange={handleBrandSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={20} />
                  </InputAdornment>
                ),
                sx: { backgroundColor: "white", borderRadius: 1 },
              }}
              sx={{ mb: 2 }}
            />
            <List>
              {filteredBrands?.map((brand, index) => (
                <React.Fragment key={brand?._id}>
                  <ListItem
                    button
                    onClick={() => handleBrandClick(brand.name)}
                    sx={{ cursor: "pointer", mb: 1 }}
                  >
                    <img
                      src={`http://localhost:3003

${brand.img}`}
                      alt="Img not Found"
                      style={{
                        width: "45px",
                        height: "45px",
                        marginRight: "6px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <ListItemText
                      primary={brand?.name}
                      style={{ color: "#452a6f" }}
                    />
                    <IconButton edge="end">
                      {expandedBrand === brand?.name ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </IconButton>
                  </ListItem>
                  <Collapse
                    in={expandedBrand === brand?.name}
                    timeout="auto"
                    unmountOnExit
                  >
                    {categories.map((category, catIndex) => (
                      <React.Fragment key={category?._id}>
                        <ListItem
                          button
                          sx={{ pl: 4, cursor: "pointer", mb: 1 }}
                          onClick={() => handleCategoryClick(category?.name)}
                        >
                          <ListItemText
                            primary={
                              <>
                                {category?.name}
                              </>
                            }
                            style={{ color: "#452a6f" }}
                          />
                          <IconButton edge="end">
                            {expandedCategory === category?.name ? (
                              <ChevronDown size={18} />
                            ) : (
                              <ChevronRight size={18} />
                            )}
                          </IconButton>
                        </ListItem>
                        <Collapse
                          in={expandedCategory === category?.name}
                          timeout="auto"
                          unmountOnExit
                        >
                          {subCategories
                            .filter(
                              (subcat) =>
                                category?.name === subcat?.category?.name
                            )
                            .map((subCategory, catIndex) => (
                              <React.Fragment key={subCategory?._id}>
                                <ListItem
                                  button
                                  sx={{ pl: 6, cursor: "pointer", mb: 1 }}
                                  onClick={() =>
                                    handleSubCategoryClick(subCategory?.name)
                                  }
                                >
                                  <ListItemText
                                    primary={subCategory?.name}
                                    style={{ color: "#452a6f" }}
                                  />
                                </ListItem>
                              </React.Fragment>
                            ))}
                        </Collapse>
                      </React.Fragment>
                    ))}
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ marginBottom: 3 }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={12} md={3}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ color: "black" }}
                >
                  {sortedProducts.length} Products Found
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  variant="outlined"
                  placeholder="Search products..."
                  size="small"
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon size={20} />
                      </InputAdornment>
                    ),
                    sx: { backgroundColor: "white", borderRadius: 1 },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id="sort-select-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={sort}
                    onChange={handleSort}
                    label="Sort By"
                  >
                    <MenuItem value="lowToHigh">Low to High</MenuItem>
                    <MenuItem value="highToLow">High to Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {sortedProducts.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
              }}
            >
              <Typography variant="h5" align="center" sx={{ color: "gray" }}>
                No Products Available
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {sortedProducts?.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item?._id}>
                  <StyledCard sx={{ width: "100%" }}>
                    <CardActionArea>
                      <CardMedia
                        component="div"
                        sx={{
                          height: 200,
                          backgroundColor: item.images[0]
                            ? "transparent"
                            : "#f0f0f0",
                          objectFit: "cover",
                        }}
                      >
                        <LazyLoadImage
                          alt={item?.productName}
                          src={`http://localhost:3003

${item.images[0]}`}
                          effect="blur"
                          height="200"
                          width="100%"
                        />
                      </CardMedia>
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography variant="h6" align="center" noWrap>
                          {item?.productName}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          align="center"
                          sx={{ mt: 0.5 }}
                        >
                          ₹{item?.variants[0]?.finalPrice.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Box sx={{ p: 1.5 }}>
                      {item.available === "Yes" ? (
                        <Button
                          variant="contained"
                          style={{ color: "white", backgroundColor: "#EC5112" }}
                          fullWidth
                          size="small"
                          startIcon={<ShoppingBag size={16} />}
                          onClick={() => handleClick(item._id)}
                        >
                          Add
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          style={{ color: "white", backgroundColor: "#EC5112" }}
                          fullWidth
                          size="small"
                          startIcon={<ShoppingBag size={16} />}
                          onClick={() => handleEnquiryModal(item.productName)}
                        >
                          Enquiry
                        </Button>
                      )}
                    </Box>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={enquiryModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Submit an Enquiry</DialogTitle>
        <form onSubmit={handleSubmitEnquiry}>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below to submit your enquiry. We will get
              back to you soon.
            </DialogContentText>
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
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone Number"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
              required
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Shop;