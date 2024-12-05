const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/router');
const response = require('./response/response');
require('dotenv').config(); // Memuat variabel dari .env

const app = express();
const port = process.env.PORT; 

// Middleware
app.use(bodyParser.json());

// Route Awal API
app.get('/', (req, res) => {
  response.success('Selamat datang di API 1Upfarm by Cangkul titik Koma', res);
});

// Routing API
router(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
