const mongoose = require('mongoose')

const products = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    highlightText: [{
        type: String,
        require: true
    }],


    description: {
        type: String,
        require: true
    },

    youtubeLinks: [
        { type: String, require:true}
    ],
    

    image: [{
        data: String,
     //   contentType: String
    }],

    category: { type: String, require:true},

    brandName: { type: String, require:true},
    
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Products', products)

