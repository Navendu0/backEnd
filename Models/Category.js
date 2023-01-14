const mongoose = require('mongoose')

const category = mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        unique: true
    },

    image:{
        public_id: {
            type: String,
          },
      
          url: {
            type: String,
            required: [true, "please add some photos"]
          }
    },
    
    
    quantity: {
        type: Number,
        default: 0
    },

})

module.exports = mongoose.model('Category', category)

