const mongoose = require('mongoose')

const user = mongoose.Schema({
    username: {
         type: 'string', required: true, unique: true 
        },
    password: { 
        type: 'string', required: true
     },
    registrationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', user)

