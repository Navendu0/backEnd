const mongoose = require('mongoose')

const brand = mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        default: 0
    },

})

module.exports = mongoose.model('Brand', brand)

