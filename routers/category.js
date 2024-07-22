const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
    image: req.body.image
  });

  try {
    const savedCategory = await category.save();
    res.status(201).json({ msg: "Category created successfully", data: savedCategory, status: 201 });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
