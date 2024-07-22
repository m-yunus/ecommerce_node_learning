const mongoose = require("mongoose");

// schema
const categorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    
    image: {
      type: String,
      default: "",
    },
    color:{
        type: String,
        default: "",
    },
    icon:{
        type: String,
        default: "",
    }
}
);

// model
module.exports = mongoose.model("categories", categorySchema);
