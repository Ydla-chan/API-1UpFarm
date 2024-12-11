const express = require('express');
const router = require('./routes');
const response = require('../response/response');
require('dotenv').config(); // Memuat variabel dari .env
const path = require('path');

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '../public')));

// Route Awal API
app.get('/', (req, res) => {
  response.success('Selamat datang di API 1Upfarm by Cangkul titik Koma', res);
});

// Routing API
// router(app);
app.use('/api/v1', router);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
