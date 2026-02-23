const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const { Op } = require("sequelize");

router.get("/products", async (req, res) => {
  try {
    const search = req.query.search;

    let whereCondition = {};

    if (search && search.trim() !== "") {
      whereCondition.name = {
        [Op.like]: `%${search}%`,
      };
    }

    const products = await Product.findAll({
      where: whereCondition,
    });

    res.json({ products });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;