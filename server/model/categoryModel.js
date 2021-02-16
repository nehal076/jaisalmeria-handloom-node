const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    imageUrl : {
        type : String,
        required: true
    }
})

const Category = mongoose.model('categories', schema);

module.exports = Category;