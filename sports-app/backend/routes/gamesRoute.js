const express = require("express");
const { getGames, createGame, joinGame, deleteGame, getGameDetails } = require("../controler/gameController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route('/').get(protect, getGames).post(protect, createGame)
router.route('/:id').put(protect, joinGame).delete(protect, deleteGame).get(protect, getGameDetails)

module.exports = router