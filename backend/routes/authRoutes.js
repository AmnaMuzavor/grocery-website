const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authControllers");
const authController = require("../controllers/authControllers");

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
