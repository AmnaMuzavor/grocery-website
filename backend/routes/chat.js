const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { Orders, Wishlist, Product, Cart } = require("../models");
const { Op, Sequelize } = require("sequelize");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { message, userId } = req.body;
    if (!message) return res.json({ reply: "Please type something 😊" });

    const lowerMessage = message.toLowerCase();

   
    if (["hi", "hello", "hey"].includes(lowerMessage)) {
      return res.json({
        reply:
          "Hello! 👋 Welcome to our grocery store. You can ask about your orders, wishlist, cart, or search for products."
      });
    }

 
    if (lowerMessage.includes("order") || lowerMessage.includes("purchase")) {
      const order = await Orders.findOne({
        where: { user_id: userId },
        order: [["order_id", "DESC"]],
      });
      if (!order) return res.json({ reply: "You have no recent orders." });
      return res.json({
        reply: `Your latest order (#${order.order_id}) is ${order.order_status}.`
      });
    }

    if (lowerMessage.includes("wishlist") || lowerMessage.includes("wish list")) {
      const items = await Wishlist.findAll({ where: { user_id: userId } });
      if (!items.length) return res.json({ reply: "Your wishlist is empty." });
      return res.json({ reply: `You have ${items.length} items in your wishlist.` });
    }

    if (lowerMessage.includes("cart")) {
      const cartItems = await Cart.findAll({ where: { user_id: userId } });
      if (!cartItems.length) return res.json({ reply: "Your cart is empty." });
      return res.json({ reply: `Your cart has ${cartItems.length} items.` });
    }

    if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
      return res.json({
        reply:
          "To return a product, please go to your orders page and select the product you want to return. 😊"
      });
    }


const stopWords = [
  "i","want","is","are","available","please","give","show","me",
  "do","you","have","any","the","a","an","wanna"
];

const filteredWords = lowerMessage
  .split(" ")
  .filter(w => !stopWords.includes(w.toLowerCase()));

if (filteredWords.length) {
  const conditions = filteredWords.map(word => ({
    name: Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("name")),
      "LIKE",
      `%${word.toLowerCase()}%`
    )
  }));

  const product = await Product.findOne({ where: { [Op.or]: conditions } });

  if (product) {
   
    return res.json({
      type: "product",
      product: {
        id: product.product_id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image_url 
      }
    });
  }
}


    const aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a friendly assistant for an online grocery store.
Keep replies short and helpful.
User question: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const aiData = await aiResponse.json();
    const reply =
      aiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm not sure about that, but I'm here to help! 😊";

    res.json({ reply });

  } catch (error) {
    console.error("FULL ERROR:", error);
    res.json({ reply: "Oops! Something went wrong. Please try again later." });
  }
});

module.exports = router;