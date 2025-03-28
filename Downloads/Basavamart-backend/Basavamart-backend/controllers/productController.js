const Product = require("../models/product");
const Brand = require("../models/brands");
const User = require("../models/user");
const Category = require("../models/category");
const SubCategory = require("../models/SubCategory"); 
const Catalog = require("../models/catalog");

exports.addProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      desc: req.body.desc,
      img: `/uploadImg/${req.file.filename}`,
      material: req.body.material,
      quality: req.body.quality,
      weight: req.body.weight,
      brand: req.body.brand,
      category: req.body.category,
      subcategory: req.body.subcategory,
      access: req.body.access,
      available: req.body.available,
      variants: req.body.variants,
      
    });

    await product.save();
    console.log("product added");
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("brand")
      .populate("category")
      .populate("subcategory"); // Populate subcategory
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    const { name, category, img } = req.body;
    const newSubCategory = new SubCategory({ name, category, img });
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to add subcategory" });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, img } = req.body;
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      { name, category, img },
      { new: true }
    );
    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subcategory" });
  }
};


exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await SubCategory.findByIdAndDelete(id);
    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
};

exports.getUserProduct = async (req, res) => {
  try {
    const products = await Product.find({ access: "User" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { query } = req.query;
    const UserId = req.user.id;
    const user = await User.findById(UserId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { role } = user;
    let accessFilter;

    // Define access based on role
    if (role.toLowerCase() === "user") {
      accessFilter = ["user"];
    } else if (role.toLowerCase() === "member") {
      accessFilter = ["user", "member"];
    } else if (role.toLowerCase() === "special member") {
      accessFilter = []; // No restriction for special member
    }

    // Set up the filter
    const filter = {
      ...(query ? { name: { $regex: query, $options: "i" } } : {}),
      ...(accessFilter.length > 0
        ? {
            access: { $in: accessFilter.map((r) => new RegExp(`^${r}$`, "i")) },
          }
        : {}),
    };

    const products = await Product.find(filter)
      .populate("brand", "name")
      .populate("category", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.getuserProductByBrand = async (req, res) => {
  try {
    const { brand, category } = req.query;
    const filter = {};

    // Check if the brand is provided and is valid
    if (brand) {
      const brandObj = await Brand.findOne({ name: brand });
      if (brandObj) {
        filter.brand = brandObj._id;
      } else {
        return res.status(404).json({ error: "Brand not found" });
      }
    }

    if (category) {
      const categoryObj = await Category.findOne({ name: category });
      if (categoryObj) {
        filter.category = categoryObj._id;
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    }

    // Fetch products based on the filter
    const products = await Product.find(filter)
      .populate("brand", "name")
      .populate("category", "name");

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for the specified filters" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};


exports.getProductByBrand = async (req, res) => {
  try {
    const { brand, category } = req.query;
    const UserId = req.user.id;
    const user = await User.findById(UserId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { role } = user;
    let accessFilter;

    // Define access based on role
    if (role.toLowerCase() === "user") {
      accessFilter = ["user"];
    } else if (role.toLowerCase() === "member") {
      accessFilter = ["user", "member"];
    } else if (role.toLowerCase() === "special member") {
      accessFilter = []; // No restriction for special member
    }

    // Base filter
    const filter = {};

    // Apply access filter
    if (accessFilter.length > 0) {
      filter.access = {
        $in: accessFilter.map((r) => new RegExp(`^${r}$`, "i")),
      };
    }

    // Apply brand filter
    if (brand) {
      const brandObj = await Brand.findOne({ name: brand });
      if (brandObj) {
        filter.brand = brandObj._id;
      } else {
        return res.status(404).json({ error: "Brand not found" });
      }
    }

    // Apply category filter
    if (category) {
      const categoryObj = await Category.findOne({ name: category });
      if (categoryObj) {
        filter.category = categoryObj._id;
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    }

    // Fetch products with filters
    const products = await Product.find(filter)
      .populate("brand", "name")
      .populate("category", "name");

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("brand", "name")
      .populate("category", "name");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const brand = await Brand.find();
    res.json(brand);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      desc,
      img,
      material,
      quality,
      weight,
      brand,
      category,
      access,
      available,
      variants,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        desc,
        img,
        material,
        quality,
        weight,
        brand,
        category,
        access,
        available,
        variants,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, subcat } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, subcat },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addBrand = async (req, res) => {
  try {
    const { name, img, available } = req.body;
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }
    const brand = new Brand({
      name,
      img,
      available,
    });
    await brand.save();
    res.json(brand);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name, subcat } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = new Category({
      name,
      subcat,
    });
    await category.save();
    res.json(category);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { name, img, available } = req.body;
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { name, img, available },
      { new: true }
    );
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(brand);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Brand deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { id } = req.params; // Product ID
    const file = req.file; // Uploaded file

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const catalog = new Catalog({
      productId: id,
      file: file.path,
    });

    await catalog.save();
    res.status(201).json({ message: "File uploaded successfully", catalog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadFile = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // Fetch the catalog record from the database
    const catalog = await Catalog.findOne({ productId: id });

    if (!catalog) {
      return res.status(404).send("Catalog not found");
    }

    // Extract the file path
    const filePath = catalog.file;

    // Serve the file
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error downloading file");
      }
    });
  } catch (error) {
    console.error("Error fetching catalog:", error);
    res.status(500).send("Server error");
  }
};
