const express = require("express");
const router = express.Router();
const { Cart, Product } = require("../models");

const parseProducts = (cart) => {
  if (!cart || !cart.products) return [];

  let products = cart.products;

  if (typeof products === "string") {
    try {
      products = JSON.parse(products);
    } catch (e) {
      return [];
    }
  }

  if (Array.isArray(products)) {
    return products.map(item => {
      if (typeof item === "number") {
        return { product_id: item, quantity: 1 };
      }
      return item;
    });
  }

  return [];
};


router.get("/:user_id", async (req, res) => {
  try {
    console.log("GET CART - user_id:", req.params.user_id);
    
    const cart = await Cart.findOne({
      where: { user_id: req.params.user_id }
    });

    console.log("GET CART - cart found:", cart ? "yes" : "no");
    if (cart) {
      console.log("GET CART - raw products:", cart.products);
      console.log("GET CART - products type:", typeof cart.products);
    }

    if (!cart) return res.json([]);

    let products = cart.products;

    if (typeof products === "string") {
      products = JSON.parse(products);
    }

    console.log("GET CART - parsed products:", products);

    const detailedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findByPk(item.product_id);
        if (!product) return null;


        const productData = product.toJSON ? product.toJSON() : product;
        
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          id: item.product_id,
          name: productData.name,
          price: productData.price,
          discount_price: productData.discount_price,
          image_url: productData.image_url,
          unit: productData.unit,
          is_available: productData.is_available
        };
      })
    );

    console.log("GET CART - sending response:", detailedProducts.filter(Boolean));
    res.json(detailedProducts.filter(Boolean));

  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({ message: "Missing data" });
    }

    let cart = await Cart.findOne({ where: { user_id } });

    if (!cart) {
      const products = [{ product_id: parseInt(product_id), quantity: 1 }];

      await Cart.create({
        user_id,
        products: products  
      });

      return res.json({ exists: false });
    }

    let products = parseProducts(cart);

    const existing = products.find(
      p => Number(p.product_id) === Number(product_id)
    );

    if (existing) {
      existing.quantity += 1;
      cart.products = products; 
      await cart.save();
      return res.json({ exists: true });
    }

    products.push({ product_id: parseInt(product_id), quantity: 1 });

    cart.products = products;  
    await cart.save();

    res.json({ exists: false });

  } catch (err) {
    console.error("ADD CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


router.put("/increase", async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const cart = await Cart.findOne({ where: { user_id } });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    let products = parseProducts(cart);

    const item = products.find(
      p => Number(p.product_id) === Number(product_id)
    );

    if (item) item.quantity += 1;

    cart.products = products;  
    await cart.save();

    res.json({ message: "Quantity increased" });

  } catch (err) {
    console.error("INCREASE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/decrease", async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    const cart = await Cart.findOne({ where: { user_id } });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    let products = parseProducts(cart);

    const item = products.find(
      p => Number(p.product_id) === Number(product_id)
    );

    if (item) {
      item.quantity -= 1;

      if (item.quantity <= 0) {
        products = products.filter(
          p => Number(p.product_id) !== Number(product_id)
        );
      }
    }

    cart.products = products; 
    await cart.save();

    res.json({ message: "Quantity decreased" });

  } catch (err) {
    console.error("DECREASE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/remove/:user_id/:product_id", async (req, res) => {
  try {
    const { user_id, product_id } = req.params;

    const cart = await Cart.findOne({ where: { user_id } });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    let products = parseProducts(cart);

    products = products.filter(
      p => Number(p.product_id) !== Number(product_id)
    );

    cart.products = products; 
    await cart.save();

    res.json({ message: "Removed from cart" });

  } catch (err) {
    console.error("REMOVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/clear/:user_id", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { user_id: req.params.user_id }
    });

    if (!cart) return res.json({});

    cart.products = [];
    await cart.save();

    res.json({ message: "Cart cleared" });

  } catch (err) {
    console.error("CLEAR ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
