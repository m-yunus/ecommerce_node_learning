const mongoose = require('mongoose');

// schema
const productSchema = new mongoose.Schema({
    name: {
 type: String,
 required: true,
 
    },
    price: Number,
    image: String
}, {
    timestamps: true
});

// model
module.exports = mongoose.model('Product', productSchema);
