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
                category:item.category,
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
        image: req.body.image,
        category:req.body.category
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

router.get('/specific',async (req,res)=>{
    try {
        const product=await Product.find().select('name image -_id')
res.json({data:product,status:200}).status(200)
    } catch (error) {
        console.log(error);
        res.json({data:error,status:500}).status(500)
    }
})
//get a single product
router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('category', 'name image color icon -_id');
      if (!product) {
        return res.status(404).json({ data: 'Product not found', status: 404 });
      }
      res.status(200).json({ data: product, status: 200 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: error.message, status: 500 });
    }
  });

module.exports = router;
