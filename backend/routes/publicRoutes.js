const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const { Op } = require("sequelize");

// router.get("/products", async (req, res) => {
//   try {
//     const search = req.query.search;

//     let whereCondition = {};

//     if (search && search.trim() !== "") {
//       whereCondition.name = {
//         [Op.like]: `%${search}%`,
//       };
//     }

//     const products = await Product.findAll({
//       where: whereCondition,
//     });

//     res.json({ products });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });



router.get("/products", async (req, res) => {
  try {

    const { search, category_id, sort } = req.query;

    let whereCondition = {};
    let orderCondition = [];

   
    if (search && search.trim() !== "") {
      whereCondition.name = {
        [Op.like]: `%${search}%`,
      };
    }

  
    if (category_id && category_id !== "") {
      whereCondition.category_id = category_id;
    }

   
    if (sort === "low") {
      orderCondition = [["price", "ASC"]];
    } 
    else if (sort === "high") {
      orderCondition = [["price", "DESC"]];
    }

    const products = await Product.findAll({
      where: whereCondition,
      order: orderCondition
    });

    res.json({ products });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;