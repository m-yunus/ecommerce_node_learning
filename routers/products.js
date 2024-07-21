const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        console.log('Fetched products:', products); // Debugging log
        res.status(200).json({
            status: '200',
            data: products.map((item, i) => ({
                id: item._id,
                product_id: i,
                name: item.name,
                price: item.price,
                image: item.image,
                createdAt: item.createdAt
            })),
            message: 'Products fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching products:', error); // Debugging log
        res.status(500).json({ message: error.message,succes:false });
    }
});

// Create a new product
router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    });

    try {
        const savedProduct = await product.save();
        console.log('Saved product:', savedProduct); // Debugging log
        res.status(201).json({
            status: 201,
            data: savedProduct,
            message: 'Product created successfully'
        });
    } catch (error) {
        console.error('Error creating product:', error); // Debugging log
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
