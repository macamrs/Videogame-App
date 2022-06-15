const { Router } = require('express');
const router = Router();
const { createVideoGame, gameDetail } = require('../control/gameControl')

// POST /videogame (create a videogame)
router.post('/', createVideoGame)

// GET /videogame/{idVideogame}
router.get('/:id', gameDetail)

// DELETE /videogame/{idVideogame}
// router.delete('/:id', gameDeleted)

module.exports = router;