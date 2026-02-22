
const express = require("express");
const router = express.Router();
const { Product } = require("../models");
const { Op } = require("sequelize");


router.get("/api/products", async (req, res) => {
  try {
    const search = req.query.search;

    let sql = "SELECT * FROM products";
    let values = [];

    if (search && search.trim() !== "") {
      sql += " WHERE name LIKE ?";
      values.push(`%${search}%`);
    }

    const [rows] = await db.execute(sql, values);

    res.json({ products: rows });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;