const express = require('express');
const cors = require('cors');
const db = require('./config/config.json');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Grocery Backend Running');
});

// app.get('/api/products', (req, res) => {
//   const sql = 'SELECT * FROM products';
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);
//   });
// });

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
