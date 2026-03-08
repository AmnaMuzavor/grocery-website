
const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const {
  createCategory,getCategories,deleteCategory,uploadCategoryImage,updateCategory} = require("../controllers/categoryController");

  // const { createProduct } = require("../controllers/productController");
const {
  createProduct,
  uploadProductImages
} = require("../controllers/productController");


const verifyToken = require("../middleware/authMiddleware"); 
const isAdmin = require("../middleware/adminMiddleware"); 



router.post(
  "/category",
  verifyToken,
  isAdmin,
  uploadCategoryImage,   
  createCategory
);


router.post(
  "/product",
  verifyToken,
  isAdmin,
  uploadProductImages,   
  createProduct
);


router.put("/category/:id", verifyToken, isAdmin, uploadCategoryImage, updateCategory);


router.get("/categories", verifyToken, isAdmin, getCategories);
router.delete("/category/:id", verifyToken, isAdmin, deleteCategory);

router.get("/products", verifyToken, isAdmin, async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});
router.put("/product/:id/toggle", verifyToken, isAdmin, async (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.is_available;

  try {
    await Product.update(
      { is_available: newStatus },
      { where: { product_id: id } }
    );

    res.json({ message: "Status updated" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating status" });
  }
});


router.put(
  "/product/:id",
  verifyToken,
  isAdmin,
  uploadProductImages,
  async (req, res) => {
    try {

      const id = req.params.id;

      const {
        name,
        description,
        price,
        discount_price,
        unit,
        stock_quantity,
        category_id
      } = req.body;

      let mainImage;

      if (req.files && req.files["mainImage"]) {
        mainImage = "/uploads/products/" + req.files["mainImage"][0].filename;
      }

      const finalDiscountPrice =
        discount_price && discount_price !== ""
          ? parseFloat(discount_price)
          : null;

      await Product.update(
        {
          name,
          description,
          price: parseFloat(price),
          discount_price: finalDiscountPrice,
          unit,
          stock_quantity: parseInt(stock_quantity),
          category_id,
          ...(mainImage && { image_url: mainImage })
        },
        {
          where: { product_id: id }
        }
      );

      res.json({ message: "Product updated successfully" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating product" });
    }
  }
);


router.put('/product/:id/toggle', async (req, res) => {
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
});




module.exports = router;
