const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    addressList: {
        type: Array
    },
    contactInfo: {
        type: Array
    },

})

const User = mongoose.model('userDetails', schema);

module.exports = User;