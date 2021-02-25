const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productList : {
        type : [
            {
                productId: { 
                    type : mongoose.Schema.Types.ObjectId, 
                    ref: 'products' 
                },
                qty: { 
                    type : String
                },
            }
        ],
        required: true
    }
})

const Cart = mongoose.model('carts', schema);

module.exports = Cart;