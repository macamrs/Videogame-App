const { Router } = require('express');
const { getGenres } = require('../control/genreControl')

const router = Router();

// GET all genres
// http://localhost:3001/genres
router.get('/', getGenres)

module.exports = router;