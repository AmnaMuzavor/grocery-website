const Razorpay = require("razorpay");
const crypto = require("crypto");
const { Order, Payment, Cart, Product } = require("../models");

// Razorpay instance with keys from rzp-key.csv
const razorpay = new Razorpay({
  key_id: "rzp_test_SMd5kOJJNHcMit",
  key_secret: "mgBd6fEHOYoCfh26pt2daDtY"
});

// Parse products - handle both stringified and non-stringified JSON
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
  return Array.isArray(products) ? products : [];
};

exports.createOrder = async (req, res) => {
  try {
    const { user_id } = req.body;

    const cart = await Cart.findOne({ where: { user_id } });

    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const products = parseProducts(cart);

    // Fetch product details for each item to get the price
    const productsWithPrice = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findByPk(item.product_id);
        if (!product) return null;
        
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price, // Use actual price from database
          name: product.name,
          unit: product.unit
        };
      })
    );

    const validProducts = productsWithPrice.filter(Boolean);

    if (validProducts.length === 0) {
      return res.status(400).json({ message: "No valid products in cart" });
    }

    const total_amount = validProducts.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    const newOrder = await Order.create({
      user_id,
      products: validProducts,
      total_amount,
      order_status: "pending"
    });

    await Payment.create({
      order_id: newOrder.order_id,
      payment_method: "Card",
      payment_status: "pending"
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: total_amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: "order_" + newOrder.order_id
    });

    res.json({
      razorpayOrder,
      order_id: newOrder.order_id,
      total_amount
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", "mgBd6fEHOYoCfh26pt2daDtY")
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      await Payment.update(
        { payment_status: "success" },
        { where: { order_id } }
      );

      await Order.update(
        { order_status: "confirmed" },
        { where: { order_id } }
      );

      res.json({ success: true });

    } else {

      await Payment.update(
        { payment_status: "failed" },
        { where: { order_id } }
      );

      res.status(400).json({ success: false });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create COD (Cash on Delivery) Order
exports.createCODOrder = async (req, res) => {
  try {
    console.log("COD Order Request:", req.body);
    
    const { 
      user_id, 
      products, 
      total_amount, 
      shipping_details,
      payment_method 
    } = req.body;

    if (!user_id || !products || products.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    console.log("Creating order for user:", user_id);

    // Create order
    const newOrder = await Order.create({
      user_id,
      products: products,
      total_amount,
      order_status: "confirmed", // COD orders are confirmed immediately
    });

    console.log("Order created:", newOrder.order_id);

    // Create payment record
    const payment = await Payment.create({
      order_id: newOrder.order_id,
      payment_method: payment_method || "COD",
      payment_status: "pending" // Will be updated upon delivery
    });

    console.log("Payment created:", payment.payment_id);

    // Clear cart after order
    const cart = await Cart.findOne({ where: { user_id } });
    if (cart) {
      console.log("Found cart, clearing products");
      cart.products = [];  // Don't stringify - Sequelize JSON type handles it
      await cart.save();
      console.log("Cart cleared");
    }

    res.json({
      success: true,
      order_id: newOrder.order_id,
      message: "Order placed successfully"
    });

  } catch (error) {
    console.error("CREATE COD ORDER ERROR:", error.message);
    console.error("Error name:", error.name);
    console.error("Error original:", error.original);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: error.message, details: error.original?.message });
  }
};

// Get all orders for a user
exports.getOrders = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Order.findAll({
      where: { user_id },
      order: [['order_id', 'DESC']]
    });

    // Get payment details for each order
    const ordersWithPayment = await Promise.all(
      orders.map(async (order) => {
        const payment = await Payment.findOne({
          where: { order_id: order.order_id }
        });
        return {
          ...order.toJSON(),
          payment_method: payment ? payment.payment_method : null,
          payment_status: payment ? payment.payment_status : null
        };
      })
    );

    res.json({ success: true, orders: ordersWithPayment });

  } catch (error) {
    console.error("GET ORDERS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const { order_id, user_id } = req.body;

    if (!order_id || !user_id) {
      return res.status(400).json({ message: "Order ID and User ID are required" });
    }

    // Find the order
    const order = await Order.findOne({
      where: { order_id, user_id }
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order can be cancelled (only pending or confirmed orders)
    if (order.order_status === "cancelled") {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    if (order.order_status === "delivered") {
      return res.status(400).json({ message: "Cannot cancel delivered order." });
    }

    // Update order status to cancelled
    await Order.update(
      { order_status: "cancelled" },
      { where: { order_id } }
    );

    // Update payment status
    await Payment.update(
      { payment_status: "refunded" },
      { where: { order_id } }
    );

    res.json({ 
      success: true, 
      message: "Order cancelled successfully. Refund will be processed within 5-7 business days." 
    });

  } catch (error) {
    console.error("CANCEL ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
