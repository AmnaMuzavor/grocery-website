const express = require("express");
const router = express.Router();
// const { createCategory, getCategories, deleteCategory, uploadCategoryImage, } = require("../controllers/categoryController");
const {
  createCategory,getCategories,deleteCategory,uploadCategoryImage,updateCategory} = require("../controllers/categoryController");

const verifyToken = require("../middleware/authMiddleware"); 
const isAdmin = require("../middleware/adminMiddleware"); 



router.post(
  "/category",
  verifyToken,
  isAdmin,
  uploadCategoryImage,   
  createCategory
);
router.put("/category/:id", verifyToken, isAdmin, uploadCategoryImage, updateCategory);


router.get("/categories", verifyToken, isAdmin, getCategories);
router.delete("/category/:id", verifyToken, isAdmin, deleteCategory);

module.exports = router;
