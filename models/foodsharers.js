const mongoose = require('mongoose')

const foodsharerSchema = new mongoose.Schema({
    foodsharerName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    communityName: {
        type: String,
        required: true
    },
    registeredDate: {
        type: Date,
        required: true,
        default: Date.now

    }
})

module.exports = mongoose.model('Foodsharer', foodsharerSchema)