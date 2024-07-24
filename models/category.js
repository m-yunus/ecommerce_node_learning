const mongoose = require("mongoose");

// schema
const categorySchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
      default:''
    },
    image: {
      type: String,
  default:''
    },
    color: {
      type: String,
  default:''
    },
    icon: {
      type: String,
  default:''
    }
  },
  {
    timestamps: true, // Add timestamps to automatically manage `createdAt` and `updatedAt`
  }
);

// model
module.exports = mongoose.model("categories", categorySchema); // Fixed model name to singular
