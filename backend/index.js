const express = require('express');
const cors = require('cors');
const db = require('./models');  

const app = express();

app.use(cors());
app.use(express.json());



const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);



app.use("/uploads", express.static("uploads"));



const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api", categoryRoutes);


app.get('/', (req, res) => {
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

  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
