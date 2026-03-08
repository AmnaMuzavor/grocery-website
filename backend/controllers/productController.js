const multer = require("multer");
const path = require("path");
const { Product, ProductImage } = require("../models");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

exports.uploadProductImages = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 10 }
]);

exports.createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const {
      name,
      description,
      price,
       discount_price,
      unit,
      stock_quantity,
      category_id
    } = req.body;

    let mainImage = "";

    if (req.files["mainImage"]) {
      mainImage = "/uploads/products/" + req.files["mainImage"][0].filename;
    }
    const finalDiscountPrice =
  discount_price && discount_price !== ""
    ? parseFloat(discount_price)
    : null;
    if (finalDiscountPrice && finalDiscountPrice > price) {
  return res.status(400).json({
    message: "Discount price cannot be greater than original price"
  });
}



 
const product = await Product.create({
  name,
  description,
  price: parseFloat(price),
  discount_price: finalDiscountPrice,
  unit,
  stock_quantity: parseInt(stock_quantity),
  category_id,
  image_url: mainImage
});

    if (req.files["images"]) {
      const images = req.files["images"];

      for (let i = 0; i < images.length; i++) {
        await ProductImage.create({
          product_id: product.product_id,
          image_url: "/uploads/products/" + images[i].filename
        });
      }
    }

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating product" });
  }
};


// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { category_id: req.params.id },
      include: [
        {
          model: ProductImage,
          attributes: ["id", "image_url"]
        }
      ]
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { category_id: req.params.id },
      include: [
        {
          model: ProductImage,
          attributes: ["id", "image_url"]
        }
      ]
    });

    res.status(200).json({ products });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};


exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

        res.json({ product });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


//for stock

exports.toggleAvailability = async (req, res) => {
  const { id } = req.params;
  const { is_available } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.is_available = is_available;
    await product.save();

    res.json({ message: "Product availability updated", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};