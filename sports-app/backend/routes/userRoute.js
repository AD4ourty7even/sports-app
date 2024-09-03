const express = require("express");
const { registerUser, getMe, loginUser } = require("../controler/userControler");

const router = express.Router();

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

module.exports = router