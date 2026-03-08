const express = require("express");
const router = express.Router();
const { Product, Order, Payment , Users} = require("../models");
const { Op } = require("sequelize");

router.get("/notifications", async (req, res) => {
  try {

   
    const lowStockProducts = await Product.findAll({
      where: {
        stock_quantity: {
          [Op.lt]: 5
        }
      }
    });

   
 

const pendingOrders = await Order.findAll({
  where: { order_status: "pending" },
  include: [
    {
      model: Users,
      attributes: ["name"]
    }
  ]
});
   console.log(JSON.stringify(pendingOrders, null, 2));
   
    const failedPayments = await Payment.findAll({
      where: {
        payment_status: "failed"   
      }
    });

    res.json({
      lowStockProducts,
      pendingOrders,
      failedPayments
    });

  } catch (error) {
    console.error("Notification Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;