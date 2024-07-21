const express = require('express');
const app = express();
require('dotenv').config(); // Fixed to use correct dotenv method
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

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
    console.error('Database connection error:', err); // Improved logging
});

// Routes
const port = process.env.PORT || 8080;
const api = process.env.API || '/api';

const productRouter = require('./routers/products');
app.use(`${api}products`, productRouter);

// Server
app.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`Server is running on port http://localhost:${port}`);
});
