const mongoose = require('mongoose')

const featurePhotos = mongoose.Schema({
    photos:[{
        public_id: {
          type: String,
        },
    
        url: {
          type: String,
          required: [true, "please add some photos"]
        }
      }]
})

module.exports = mongoose.model('FeaturePhotos', featurePhotos)

