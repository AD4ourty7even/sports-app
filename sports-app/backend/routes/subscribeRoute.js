const express = require("express");
const { subscribe } = require("../controler/subscriptionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/', protect, subscribe)

module.exports = router