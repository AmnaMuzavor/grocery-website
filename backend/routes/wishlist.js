const express = require("express");
const router = express.Router();
const { Wishlist, Product } = require("../models");


router.post("/add", async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const exists = await Wishlist.findOne({
      where: { user_id, product_id }
    });

    if (exists) {
      return res.status(200).json({
        message: "Already in wishlist",
        exists: true
      });
    }

    const wishlistItem = await Wishlist.create({
      user_id,
      product_id
    });

    return res.status(201).json({
      message: "Added to wishlist",
      exists: false,
      wishlistItem
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



// const { Wishlist, Product } = require("../models");

router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { user_id: req.params.userId },
      include: [
        {
          model: Product,
          attributes: [
            "product_id",
            "name",
            "price",
            "unit",
            "image_url",
            "stock_quantity",
            "is_available"
          ]
        }
      ]
    });

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/remove/:wishlist_id", async (req, res) => {
  try {
    const { wishlist_id } = req.params;

    const deleted = await Wishlist.destroy({
      where: { wishlist_id }
    });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Removed from wishlist" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;