const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const { default: mongoose } = require('mongoose');

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
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
        description: req.body.description,
        richDescription: req.body.richDescription || '',
        image: req.body.image || '',
        images: req.body.images || [],
        brand: req.body.brand || '',
        price: req.body.price || 0,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating || 0,
        numReviews: req.body.numReviews || 0,
        isFeatured: req.body.isFeatured || false,
        dateCreated: req.body.dateCreated || Date.now(),
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
  //update product
  router.put('/:id', async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({data:'Invalid product id',status:400})
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
            });
            if (!product) {
                return res.status(404).json({ data: 'Product not found', status: 404
                    });
                    }
                    res.status(200).json({ data: product, status: 200 });
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ data: error.message, status: 500 });
                    }
                })
//count in products
router.get('/get/count',async(req,res)=>{
    try {
        const productcount=await Product.countDocuments();
        res.json({data:productcount,status:200}).status(200)
        } catch (error) {
            console.log(error);
            res.json({data:error,status:500}).status(500)
            }

})
//featured products
router.get('/get/featured',async(req,res)=>{
    try {
        const productfeatured=Product.find({isFeatured:true})
        res.json({data:productfeatured,status:200}).status(200)
        } catch (error) {
            console.log(error);
            res.json({data:error,status:500}).status(500)
        }
        })
module.exports = router;
