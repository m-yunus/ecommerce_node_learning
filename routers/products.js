const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const { default: mongoose } = require('mongoose');
const multer = require('multer');

// Allowed file types
const FileTypes = {
  "image/png": 'png',
  "image/jpeg": 'jpeg',
  'image/jpg': 'jpg'
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FileTypes[file.mimetype];
    let uploadError = new Error('Invalid image type');

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, './public/uploads');  // Make sure this path is correct
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FileTypes[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
});

const uploadOptions = multer({ storage: storage });

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().select('name');
    console.log('Fetched products:', products); // Debugging log
    res.status(200).json({
      status: '200',
      data: products,
      message: 'Products fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching products:', error); // Debugging log
    res.status(500).json({ message: error.message, success: false });
  }
});

// Create a new product
router.post("/", uploadOptions.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided or invalid image type.' });
  }

  const fileName = req.file.filename;
  const basepath = `${req.protocol}://${req.get('host')}/public/uploads/`;
  
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription || '',
    image: `${basepath}${fileName}`,
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
router.get('/get/featured/:count', async (req, res) => {
    try {
      const count = req.params.count ? parseInt(req.params.count) : 3;
      const productFeatured = await Product.find({ isFeatured: false }).limit(count);
      res.status(200).json({ data: productFeatured, status: 200 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ data: error.message, status: 500 });
    }
  });
  //sort by review by post method
  router.post('/get/sortreview', async (req, res) => {
    try {
      const { rate,order } = req.body; // We're no longer using 'sort' since we're filtering by a specific review value.
      const productSort = await Product.find({ rating: rate })
      .select('name -_id')
      .sort({ rating: -1 }); // Sort by rating descending
      res.status(200).json({ data: productSort, status: 200 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ data: error.message, status: 500 });
    }
  });
  //testing with queries
  router.get('/a/', async (req, res) => {
    try {
        // http://localhost:8040/api/nodejs_ecom/learning/products?categories=669fade1d23e99ef2888caa8
      let filter={}
      if(req.query.categories){
        filter={category:req.query.categories.split(",")}
      }
      const productlist=await Product.find(filter)
      res.json({data:productlist,status:200}).status(200);



    } catch (error) {
      res.json({succes:false,msg:"server error",status:400})
        
    }
})

  
module.exports = router;
