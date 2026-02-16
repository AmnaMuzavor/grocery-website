// const multer = require("multer");
// const path = require("path");
// const { Category } = require("../models");

// const { Category } = require("../models");

// // Create category
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, description, image_url } = req.body;

//     const category = await Category.create({ name, description, image_url });
//     res.status(201).json({ message: "Category created", category });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all categories
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.findAll({ order: [["created_at", "DESC"]] });
//     res.json({ categories });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const category = await Category.findByPk(id);

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     await category.destroy();
//     res.json({ message: "Category deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const multer = require("multer");
const path = require("path");
const { Category } = require("../models");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");   
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
exports.uploadCategoryImage = upload.single("image");


exports.createCategory = async (req, res) => {
  try {

     console.log(" CREATE CATEGORY HIT");


    const { name, description } = req.body;

    let image_url = "";

    if (req.file) {
      image_url = `/uploads/categories/${req.file.filename}`;
    }

    const category = await Category.create({
      name,
      description,
      image_url,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });

  } catch (error) {
  console.error("CREATE CATEGORY ERROR:", error);  
  res.status(500).json({ error: error.message });
}

};



exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json({ categories });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    res.json({ message: "Category deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const category = await Category.findOne({
      where: { category_id: id }
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    category.description = description;

    if (req.file) {
      category.image_url = `/uploads/categories/${req.file.filename}`;
    }

    await category.save();

    res.json({
      message: "Category updated successfully",
      category,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category" });
  }
};
