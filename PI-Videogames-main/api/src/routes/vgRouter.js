const { Router } = require('express');
const { getAllVideoGames } = require('../control/vgControl');

const router = Router();

// http://localhost:3001/videogames

// GET /videogames (show all videogames)
router.get('/', getAllVideoGames)

module.exports = router;