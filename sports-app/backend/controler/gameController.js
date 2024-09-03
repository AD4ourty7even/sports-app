const asyncHandler = require('express-async-handler')
const webPush = require('web-push');
const Game = require('../models/gameModel')
const User = require('../models/userModel')
const UserProfile = require('../models/userProfileModel')
const Subscription = require('../models/subscriptionModel')

webPush.setVapidDetails(
    'mailto:devadath.k001@gmail.com',
    process.env.PUBLIC_KEY,
    process.env.PRIVATE_KEY,
);

//@desc Get games
//@route GET /api/games
//@access Private
const getGames = asyncHandler(async (req, res) => {
    const games = await Game.find()
    res.status(200).json(games)
})

//@desc Create game
//@route POST /api/games
//@access Private
const createGame = asyncHandler(async (req, res) => {
    const { gameType, location, date, startTime, maxPlayers } = req.body

    if(!gameType || !location || !date || !startTime || !maxPlayers){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userProfile = await UserProfile.findOne({user: req.user.id})
    const game = await Game.create({
        user: req.user,
        hostName: req.user.name,
        gameType, location, date, startTime, maxPlayers,
        participants: [{
            userId: req.user.id,
            name: userProfile.name,
            phone: userProfile.phone
        }]
    })

    const subscriptions = await Subscription.find({})
    console.log(`Found ${subscriptions.length} subscriptions`);

    try {
        const notifications = subscriptions.map(subscription => {
            const payload = JSON.stringify({
                title: `${game.gameType} match hosted`,
                body:   `Join now! at ${game.location}`,
            });

            const subs = {
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.keys.p256dh,
                    auth: subscription.keys.auth
                }
            }

            console.log('Sending notification to:', subs.endpoint);
            return webPush.sendNotification(subs, payload)
        });

        await Promise.all(notifications);
        console.log('Notifications sent successfully');
    } catch (error) {
        console.error('Error sending notifications:', error);
    }


    res.status(200).json(game)
})

//@desc Get specific game details
//@route GET /api/games
//@access Private
const getGameDetails = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id)
    if(!game){
        res.status(400)
        throw new Error('Game not found')
    }
    res.status(200).json(game)
})

//@desc Join a game
//@route PUT /api/games
//@access Private
const joinGame = asyncHandler(async (req, res) => {

    const game = await Game.findById(req.params.id)
    if(!game){
        res.status(400)
        throw new Error('Game not found')
    }

    if(game.participants.includes(req.user.id)){
        res.status(400)
        throw new Error('User already joined')
    }

    if(game.participants.length >= game.maxPlayers){
        res.status(400)
        throw new Error('Game is full')
    }

    const userProfile = await UserProfile.findOne({user: req.user.id})

    game.participants.push({
        userId: req.user.id,
        name: userProfile.name,
        phone: userProfile.phone
    })
    
    await game.save()
    res.status(200).json(game)
})

//@desc Delete a game
//@route DELETE /api/games
//@access Private
const deleteGame = asyncHandler(async (req, res) => {

    const game = await Game.findById(req.params.id)
    if(!game){
        res.status(400)
        throw new Error('Game not found')
    }

    if(game.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Game.findByIdAndDelete(req.params.id)

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGames,
    createGame,
    joinGame,
    deleteGame,
    getGameDetails
}
