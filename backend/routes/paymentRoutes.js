const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-order", paymentController.createOrder);
router.post("/verify", paymentController.verifyPayment);
router.post("/create-cod", paymentController.createCODOrder);
router.get("/orders/:user_id", paymentController.getOrders);
router.post("/cancel-order", paymentController.cancelOrder);

module.exports = router;
