const mongoose = require("mongoose");

// schema
const categorySchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,

    },
    color: {
      type: String,

    },
    icon: {
      type: String,

    }
  },
  {
    timestamps: true, // Add timestamps to automatically manage `createdAt` and `updatedAt`
  }
);

// model
module.exports = mongoose.model("categories", categorySchema); // Fixed model name to singular
