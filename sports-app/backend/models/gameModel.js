const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    hostName: {
        type: String,
        required: [true, 'Please add a name']
    },
    gameType: {
        type: String,
        required: [true, 'Please add a game type']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    startTime: {
        type: String,
        required: [true, 'Please add a start time']
    },
    maxPlayers: {
        type: Number,
        required: [true, 'Please add a max players']
    },
    participants: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name: {
                type: String
            },
            phone: {
                type: String
            },
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('Game', gameSchema)
