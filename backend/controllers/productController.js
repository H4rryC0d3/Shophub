const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/products');
  },
  filename(req, file, cb) {
    cb(
      null,
      `product-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only images allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

/* ✅ EXPORT MULTER MIDDLEWARE PROPERLY */
exports.uploadProductImages = upload.array('images', 5);

/* ================= CONTROLLERS ================= */

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET SINGLE PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const images = req.files
      ? req.files.map(f => `/uploads/products/${f.filename}`)
      : [];

    console.log("REQ BODY:", req.body); // DEBUG
    console.log("REQ FILES:", req.files);

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      images,
      image: images[0] || null
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};


// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD REVIEW
exports.addReview = async (req, res) => {
  try {
    res.json({ success: true, message: 'Review added' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// FEATURED PRODUCTS
exports.getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true });
  res.json({ success: true, data: products });
};

// TRENDING PRODUCTS
exports.getTrendingProducts = async (req, res) => {
  const products = await Product.find().sort({ totalSales: -1 });
  res.json({ success: true, data: products });
};
