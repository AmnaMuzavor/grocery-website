const express = require("express");
const router = express.Router();
const { Address } = require("../models");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const addresses = await Address.findAll({
      where: { user_id },
      order: [["address_id", "DESC"]]
    });

    res.json({ addresses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:address_id", verifyToken, async (req, res) => {
  try {
    const { address_id } = req.params;
    const user_id = req.user.user_id;

    const address = await Address.findOne({
      where: { address_id, user_id }
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({ address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { address_line, city, pincode } = req.body;
    const user_id = req.user.user_id;

    if (!address_line || !city || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAddress = await Address.create({
      user_id,
      address_line,
      city,
      pincode
    });

    res.status(201).json({ message: "Address created successfully", address: newAddress });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:address_id", verifyToken, async (req, res) => {
  try {
    const { address_id } = req.params;
    const { address_line, city, pincode } = req.body;
    const user_id = req.user.user_id;

    const address = await Address.findOne({
      where: { address_id, user_id }
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (address_line) address.address_line = address_line;
    if (city) address.city = city;
    if (pincode) address.pincode = pincode;

    await address.save();

    res.json({ message: "Address updated successfully", address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:address_id", verifyToken, async (req, res) => {
  try {
    const { address_id } = req.params;
    const user_id = req.user.user_id;

    const address = await Address.findOne({
      where: { address_id, user_id }
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await address.destroy();

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;