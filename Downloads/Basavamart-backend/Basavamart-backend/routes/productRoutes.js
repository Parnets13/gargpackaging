// routes/productRoutes.js
const express = require("express");
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  addBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getProductById,
  getProductByBrand,
  getProducts,
  uploadFile,
  downloadFile,
  getUserProduct,
  getuserProductByBrand,
  addSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const uploadImg = multer({ dest: "uploadImg/" });

const router = express.Router();


router.post("/addproduct", uploadImg.single("img"), addProduct);
router.get("/getproducts", getProducts);
router.get("/getUserProduct", getUserProduct);
router.get("/getproduct", protect, getProduct);
router.get("/getUserProductByBrand", getuserProductByBrand);
router.get("/getproduct/:id", getProductById);
router.get("/getproductbybrand", protect, getProductByBrand);
router.get("/getbrand", getBrand);
router.get("/getcategory", getCategory);
router.put("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.delete("/deletecategory/:id", deleteCategory);
router.delete("/deletebrand/:id", deleteBrand);
router.post("/addbrand", addBrand);
router.post("/addcategory", addCategory);
router.put("/updatebrand/:id", updateBrand);
router.put("/updatecategory/:id", updateCategory);

// SubCategory Routes
router.post("/addsubcategory", addSubCategory);
router.get("/getsubcategories", getSubCategories);
router.put("/updatesubcategory/:id", updateSubCategory);
router.delete("/deletesubcategory/:id", deleteSubCategory);

// File Upload Routes
const upload = require("../middleware/fileUpload");
router.post("/upload/:id", upload.single("file"), uploadFile);
router.get("/download/:id", downloadFile);

module.exports = router;