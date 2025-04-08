import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getVenderTokenFromCookie } from "../../utils/handleVenderToken";
import { jwtDecode } from "jwt-decode";

// Units of measurement
const UNITS = [
  { value: "kgs", label: "Kilograms" },
  { value: "nos", label: "Pieces" },
  { value: "meter", label: "Meters" },
  { value: "grams", label: "Grams" },
  { value: "other", label: "other" },
];

const VenderAddProduct = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [video, setVideo] = useState("");
  const [access, setAccess] = useState("");
  const [available, setAvailable] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([
    {
      name: "",
      description: "",
      weight: 0,
      qty: 0,
      unitOfMeasurement: "kgs",
      hsn: "",
      stock: 0,
      listPrice: 0,
      discount: 0,
      discountAmt: 0,
      totalWeight: 0,
      afterdiscountPrice: 0,
      profit: 0,
      profitMargin: 0,
      landingPrice: 0,
      tax: 5,
      taxAmt: 0,
      finalPrice: 0
    },
  ]);
  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");

  const calculateDiscountAmount = (listPrice, discount) => {
    const discountPercentage = parseFloat(discount) || 0;
    return listPrice * (discountPercentage / 100);
  };

  const calculateAfterDiscountPrice = (listPrice, discountAmount) => {
    return listPrice - discountAmount;
  };

  const calculateProfitMargin = (listPrice, cost) => {
    const profitPercentage = parseFloat(cost) || 0;
    return listPrice * (profitPercentage / 100);
  };

  const calculateLandingPrice = (listPrice, discountAmount, profitMargin) => {
    return listPrice - discountAmount + profitMargin;
  };

  const calculateTaxAmount = (landingPrice, tax) => {
    const taxPercentage = parseFloat(tax) || 0;
    return landingPrice * (taxPercentage / 100);
  };

  const calculateFinalPrice = (landingPrice, taxAmount) => {
    return landingPrice + taxAmount;
  };

  const handleImageUpload = (event) => {
    const newImages = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant, i) =>
        i === index
          ? calculateDerivedValues({
            ...variant,
            [field]: value,
          })
          : variant
      )
    );
  };

  const calculateDerivedValues = (variant) => {
    const discountAmt = calculateDiscountAmount(variant.listPrice, variant.discount);
    const afterdiscountPrice = calculateAfterDiscountPrice(variant.listPrice, discountAmt);
    const profitMargin = calculateProfitMargin(variant.listPrice, variant.profit);
    const landingPrice = calculateLandingPrice(variant.listPrice, discountAmt, profitMargin);
    const taxAmt = calculateTaxAmount(landingPrice, variant.tax);
    const finalPrice = calculateFinalPrice(landingPrice, taxAmt);
    const totalWeight = variant.weight * variant.qty;

    return {
      ...variant,
      discountAmt,
      afterdiscountPrice,
      profitMargin,
      landingPrice,
      taxAmt,
      finalPrice,
      totalWeight
    };
  };
  const addVariant = () => {
    setVariants((prevVariants) => [
      ...prevVariants,
      calculateDerivedValues({
        name: "",
        description: "",
        weight: 0,
        qty: 0,
        unitOfMeasurement: "kgs",
        hsn: "",
        stock: 0,
        listPrice: 0,
        discount: 0,
        profit: 0,
        tax: 5,
      }),
    ]);
  };

  const removeVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Get fresh vendor info from localStorage
    const storedVendorInfo = localStorage.getItem("vendorInfo");
    let currentVendorId = vendorId;
    let currentVendorName = vendorName;
    
    if (storedVendorInfo) {
      try {
        const parsedInfo = JSON.parse(storedVendorInfo);
        console.log("Vendor info at submit time:", parsedInfo);
        currentVendorId = parsedInfo.id || vendorId;
        currentVendorName = parsedInfo.name || vendorName;
      } catch (err) {
        console.error("Error parsing vendor info:", err);
      }
    }
    
    console.log("Submit pressed with vendor ID:", currentVendorId, "vendor name:", currentVendorName);
    
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("productName", productName); // Add both for consistency
    formData.append("productDescription", productDescription);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("video", video);
    formData.append("access", access);
    formData.append("available", available);
    
    images.forEach((image) => {
      formData.append("images", image);
    });
    
    formData.append("variants", JSON.stringify(variants));
    
    // Always include vendor information for vendor-added products
    formData.append("vendorId", currentVendorId);
    formData.append("vendorName", currentVendorName);
    formData.append("status", "pending");
    formData.append("role", "vendor"); // Add role for more explicit identification
    
    console.log("Adding product with vendor ID:", currentVendorId, "vendor name:", currentVendorName);

    try {
      const response = await axios.post(
        "http://localhost:3003/api/product/addproduct",
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${getVenderTokenFromCookie()}`
          },
        }
      );
      
      console.log("Product add response:", response);
      
      if (response.status === 201) {
        // Store the new product ID in localStorage so we know it's ours
        const vendorProducts = JSON.parse(localStorage.getItem("vendorProducts") || "[]");
        vendorProducts.push(response.data._id);
        localStorage.setItem("vendorProducts", JSON.stringify(vendorProducts));
        
        // Update local storage with current vendor info if it changed
        if (currentVendorId !== vendorId || currentVendorName !== vendorName) {
          const updatedVendorInfo = { 
            ...JSON.parse(storedVendorInfo || "{}"), 
            id: currentVendorId,
            name: currentVendorName
          };
          localStorage.setItem("vendorInfo", JSON.stringify(updatedVendorInfo));
        }
        
        toast.success("Product added successfully and awaiting admin approval");
        
        // Clear form
        setProductName("");
        setProductDescription("");
        setVideo("");
        setAccess("");
        setAvailable("");
        setBrand("");
        setCategory("");
        setSubcategory("");
        setImages([]);
        setVariants([
          {
            name: "",
            description: "",
            weight: 0,
            qty: 0,
            unitOfMeasurement: "kgs",
            hsn: "",
            stock: 0,
            listPrice: 0,
            discount: 0,
            discountAmt: 0,
            totalWeight: 0,
            afterdiscountPrice: 0,
            profit: 0,
            profitMargin: 0,
            landingPrice: 0,
            tax: 5,
            taxAmt: 0,
            finalPrice: 0
          },
        ]);
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Error adding product", error);
    }
  };

  const fetchBrand = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3003

/api/product/getbrand`
      );
      setBrands(response.data);
    } catch {
      console.error("Failed to fetch brands");
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3003

/api/product/getcategory`
      );
      setCategories(response.data);
    } catch(error) {
      console.error("Failed to fetch categories : " , error);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3003

/api/product/getsubcategory`
      );
      console.log("cat", response.data)
      setSubCategories(response.data);
    } catch (error){
      console.error("Failed to fetch subcategories",error);
    }
  };

  useEffect(() => {
    // Get vendor ID from token
    const token = getVenderTokenFromCookie();
    console.log("VenderAddProducts - Token:", token ? "Found" : "Not found");
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("VenderAddProducts - Decoded token:", decoded);
        
        // Set vendor ID from token (this is critical)
        setVendorId(decoded.id);
        console.log("Setting vendor ID to:", decoded.id);
        
        // Try to get vendor name from localStorage
        const storedVendorInfo = localStorage.getItem("vendorInfo");
        if (storedVendorInfo) {
          try {
            const parsedInfo = JSON.parse(storedVendorInfo);
            console.log("Vendor info from localStorage:", parsedInfo);
            setVendorName(parsedInfo.name || "vendor4");
            console.log("Setting vendor name to:", parsedInfo.name || "vendor4");
          } catch (err) {
            console.error("Error parsing vendor info:", err);
            setVendorName("vendor4"); // Default
          }
        } else {
          setVendorName("vendor4"); // Default
        }
      } catch (error) {
        console.error("Error decoding token in VenderAddProducts:", error);
      }
    }
    
    fetchBrand();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Product
        </Typography>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Access</InputLabel>
                <Select
                  name="access"
                  label="Access"
                  value={access}
                  onChange={(e) => setAccess(e.target.value)}
                  required
                >
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Member">Member</MenuItem>
                  <MenuItem value="Special Member">Special Member</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Brand Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                  value={brand}
                  label="Brand"
                  onChange={(e) => setBrand(e.target.value)}
                  required
                >
                  {brands.map((brandName) => (
                    <MenuItem key={brandName?._id} value={brandName?._id}>
                      {brandName.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Category Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory(""); // Reset subcategory on category change
                  }}
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat?._id} value={cat?._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Subcategory Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                {/* <Select
                  value={subcategory}
                  label="Subcategory"
                  onChange={(e) => setSubcategory(e.target.value)}
                  required
                  disabled={!category} // Disable if no category selected
                >
                  {subCategories
                    .filter((subcat) => subcat.category?._id === category)
                    .map((filteredSubcat) => (
                      <MenuItem
                        key={filteredSubcat?._id}
                        value={filteredSubcat?._id}
                      >
                        {filteredSubcat?.name}
                      </MenuItem>
                    ))}
                </Select> */}
                <Select
                  value={subcategory}
                  label="Subcategory"
                  onChange={(e) => setSubcategory(e.target.value)}
                  required
                  disabled={!category}
                >
                  {subCategories
                    .filter((subcat) => {
                      return subcat.category?._id === category;
                    })
                    .map((filteredSubcat) => (
                      <MenuItem
                        key={filteredSubcat?._id}
                        value={filteredSubcat?._id}
                      >
                        {filteredSubcat?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Product Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Grid>

            {/* Product Description with CKEditor */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Product Description
              </Typography>
              <CKEditor
                editor={ClassicEditor}
                data={productDescription}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setProductDescription(data);
                }}
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<UploadIcon />}
                >
                  Upload Images
                  <input
                    type="file"
                    name="images"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
                {images.length > 0 && (
                  <Typography variant="body2">
                    {images.length} image(s) selected
                  </Typography>
                )}
              </Box>

              {/* Image Preview */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {images.map((image, index) => (
                  <Grid item key={index}>
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product ${index + 1}`}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          color: "error.main",
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Video Link"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Available</InputLabel>
                <Select
                  name="available"
                  label="available"
                  value={available}
                  onChange={(e) => {
                    setAvailable(e.target.value);
                  }}
                  required
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Product Variants */}
            {variants.map((variant, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Variant {index + 1}
                    {variants.length > 1 && (
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => removeVariant(index)}
                        sx={{ ml: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    label="Variant Name"
                    value={variant.name}
                    onChange={(e) =>
                      handleVariantChange(index, "name", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={variant.qty}
                    onChange={(e) =>
                      handleVariantChange(index, "qty", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    label="HSN Code"
                    type="text"
                    value={variant.hsn}
                    onChange={(e) =>
                      handleVariantChange(index, "hsn", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    label="Stock"
                    type="number"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  {/* <FormControl fullWidth>
                    <InputLabel>Unit of Measurement</InputLabel>
                    <Select
                      value={variant.unitOfMeasurement}
                      label="Unit of Measurement"
                      onChange={(e) =>
                        handleVariantChange(index, "unitOfMeasurement", e.target.value)
                      }
                    >
                      {UNITS.map((unitOfMeasurement) => (
                        <MenuItem key={unitOfMeasurement.value} value={unitOfMeasurement.value}>
                          {unitOfMeasurement.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <TextField
                    fullWidth
                    label="Unit of Measurement"
                    type="text"
                    value={variant.unitOfMeasurement}
                    onChange={(e) =>
                      handleVariantChange(index, "unitOfMeasurement", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Weight'
                    type="number"
                    value={variant.weight}
                    onChange={(e) =>
                      handleVariantChange(index, "weight", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Total Weight'
                    type="number"
                    value={(variant.weight) * (variant.qty)}
                    InputProps={{ readOnly: true }}
                    // onChange={(e) =>
                    //   handleVariantChange(index, "totalWeight", e.target.value)
                    // }
                    required
                  />
                </Grid>

                {/* Variant Description with CKEditor */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Variant Description
                  </Typography>
                  <CKEditor
                    editor={ClassicEditor}
                    data={variant.description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleVariantChange(index, "description", data);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="List Price"
                    type="number"
                    value={variant.listPrice}
                    onChange={(e) =>
                      handleVariantChange(index, "listPrice", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Discount"
                    type="number"
                    value={variant.discount}
                    onChange={(e) =>
                      handleVariantChange(index, "discount", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Profit"
                    type="number"
                    value={variant.profit}
                    onChange={(e) =>
                      handleVariantChange(index, "profit", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Tax</InputLabel>
                    <Select
                      name="tax"
                      label="Tax"
                      value={variant.tax}
                      onChange={(e) =>
                        handleVariantChange(index, "tax", e.target.value)
                      }
                      required
                    >
                      <MenuItem value={5}>5%</MenuItem>
                      <MenuItem value={12}>12%</MenuItem>
                      <MenuItem value={18}>18%</MenuItem>
                      <MenuItem value={24}>24%</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <hr style={{ border: "1px solid black" }} />
                </Grid>
              </React.Fragment>
            ))}

            {/* Add Variant Button */}
            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={addVariant}
              >
                Add Another Variant
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default VenderAddProduct;
