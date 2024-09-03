const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getUserProfile, createUserProfile, editUserProfile, getMe } = require("../controler/userProfileController");

const router = express.Router();

router.route('/').post(protect, createUserProfile).put(protect, editUserProfile).get(protect, getMe)
router.route('/:id').get(protect, getUserProfile)

module.exports = router