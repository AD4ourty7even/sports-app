const mongoose = require('mongoose')

const userProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    hall: {
        type: String,
        required: [true, 'Please add your hall']
    },
    yearOfStudy: {
        type: String,
        required: [true, 'Please add your year of study']
    },
},{
    timestamps: true
})

module.exports = mongoose.model('UserProfile', userProfileSchema)