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
// Get a single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ success: false, msg: err.message });
      }
      });
      
//update a category
router.put('/:id', async (req, res) => {
  try {
    // Find the category by ID and update only the name field
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true } // This option returns the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json({
      msg: "Category name updated successfully",
      data: updatedCategory,
      status: 200
    });
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
