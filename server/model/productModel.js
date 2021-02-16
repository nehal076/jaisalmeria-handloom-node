const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    name : {
        type : String,
        required: true
    },
    imageUrl : {
        type : String,
        required: true
    },
    price:  {
        type : String,
        required: true
    },
    discount: {
        type : String
    },
    size: {
        type: String
    },
    details: {
        type: String
    },
    material: {
        type: String
    },
    rating: {
        type : Number,
        default: 5
    }
})

const Product = mongoose.model('products', schema);

module.exports = Product;