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
    

      images:[{
        public_id: {
          type: String,
        },
    
        url: {
          type: String,
          required: [true, "please add some photos"]
        }
      }],

    category: { type: String, require:true},

    brandName: { type: String, require:true},
    
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Products', products)

