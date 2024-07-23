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
  try {
   

    const category = new Category({
  
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
      image: req.body.image
    });

    const savedCategory = await category.save();
    res.status(201).json({ msg: "Category created successfully", data: savedCategory, status: 201 });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, msg: "Category not found" });
    }
    res.status(200).json({ msg: "Category deleted successfully", data: category, status: 200 });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
