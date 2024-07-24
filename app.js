const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const userAuth=require('./middlwares/middlware');



// Middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());

// Database connection
const dbUsername = encodeURIComponent('sanuyoonus');
const dbPassword = encodeURIComponent('yunus@123'); // Ensure to encode special characters
const dbCluster = 'cluster0.a1lgpnj';
const dbName = 'ecommerce_learn';

mongoose.connect(
  `mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  {
    dbName: dbName,
  }
).then(() => {
  console.log('Database connection successful');
}).catch((err) => {
  console.error('Database connection error:', err);
});

// Routes
const port = process.env.PORT || 8080;
const api = process.env.API || '/api';

const productRouter = require('./routers/products');
const categoryRouter = require('./routers/category'); // Fix import path
const SignupRouter = require('./routers/Signup');
const LoginRouter = require('./routers/Login');

app.use(`${api}signup`,SignupRouter);
app.use(`${api}login`,LoginRouter);
app.use(`${api}products`,userAuth, productRouter); // Fixed endpoint URL format
app.use(`${api}categories`,userAuth, categoryRouter); // Fixed endpoint URL format
// Server
app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Server is running on port http://localhost:${port}`);
});
