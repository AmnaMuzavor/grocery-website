const express = require('express');
const cors = require('cors');
const db = require('./models');  
require("dotenv").config();
const path = require("path");
const app = express();
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

app.use(cors());
app.use(express.json());



const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

app.use("/uploads", express.static("uploads"));

const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api", categoryRoutes);

const publicRoutes = require("./routes/publicRoutes");
app.use("/api", publicRoutes);

// router.get("/categories/:id", categoryController.getSingleCategory);
const addressRoutes = require("./routes/addressRoutes");
app.use("/api/address", addressRoutes);

const wishlistRoutes = require("./routes/wishlist");
app.use("/api/wishlist", wishlistRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const adminNotificationRoutes = require("./routes/adminNotificationRoutes");
app.use("/api/admin", adminNotificationRoutes);

const chatRoutes = require("./routes/chat");
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send('Grocery Backend Running');
});

const verifyToken = require("./middleware/authMiddleware");

// app.get("/api/test", verifyToken, (req, res) => {
//   res.json({
//     message: "You are logged in",
//     user: req.user
//   });
// });

db.sequelize.sync().then(() => {
  console.log("Database connected");

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
