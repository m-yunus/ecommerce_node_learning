const mongoose = require('mongoose');

// schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps to automatically manage `createdAt` and `updatedAt`
  }
);

// model
module.exports = mongoose.model('Category', categorySchema);
