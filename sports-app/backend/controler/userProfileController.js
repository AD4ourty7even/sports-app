const asyncHandler = require('express-async-handler')
const UserProfile = require('../models/userProfileModel')

//@desc Get my profile
//@route GET /api/profile
//@access Private
const getMe = asyncHandler(async (req, res) => {
    const userProfile = await UserProfile.findOne({user: req.user.id})
    if(!userProfile){
        res.status(400)
        throw new Error('User profile not found')
    }
    res.status(200).json(userProfile)
})

//@desc Get a user profile
//@route GET /api/profile/id
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const userProfile = await UserProfile.find({user: req.params.id})
    if(!userProfile){
        res.status(400)
        throw new Error('User profile not found')
    }
    res.status(200).json(userProfile)
})

//@desc Create user profile
//@route POST /api/profile
//@access Private
const createUserProfile = asyncHandler(async (req, res) => {
    const { phone, hall, yearOfStudy } = req.body

    if(!phone || !hall || !yearOfStudy){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const userProfileExists = await UserProfile.findOne({user: req.user.id})
    if(userProfileExists){
        res.status(400)
        throw new Error('User profile already exists')
    }

    const userProfile = await UserProfile.create({
        user: req.user,
        name: req.user.name,
        phone, hall, yearOfStudy
    })

    res.status(200).json(userProfile)
})

//@desc Edit user profile
//@route PUT /api/profile
//@access Private
const editUserProfile = asyncHandler(async (req, res) => {
    const userProfile = await UserProfile.findOne({user: req.user.id})
    if(!userProfile){
        res.status(400)
        throw new Error('User profile not found')
    }

    const { phone, hall, yearOfStudy } = req.body
    if(phone){
        userProfile.phone = phone
    }
    if(hall){
        userProfile.hall = hall
    }
    if(yearOfStudy){
        userProfile.yearOfStudy = yearOfStudy
    }

    // const updatedProfile = await UserProfile.findByIdAndUpdate(userProfile._id, userProfile, {new: true})

    await userProfile.save()

    res.status(200).json(userProfile)
})

module.exports = {
    getUserProfile, createUserProfile, editUserProfile, getMe
}