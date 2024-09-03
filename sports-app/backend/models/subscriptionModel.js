const mongoose = require('mongoose')

const subscriptionSchema = mongoose.Schema({
    endpoint: {
        type: String,
        required: true,
    },
    keys: {
        p256dh: {
            type: String,
            required: true,
        },
        auth: {
            type: String,
            required: true,
        }
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Subscription', subscriptionSchema)