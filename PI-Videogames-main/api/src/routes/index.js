const { Router } = require('express');
const router = Router();
const vgRouter = require('./vgRouter');
const genreRouter = require('./genreRouter');
const gameRouter = require('./gameRouter');
const platformRouter = require('./platformRouter')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// Hacer callbacks de los errores

// GET /videogames; GET /videogames/name
router.use("/videogames", vgRouter)

// GET /genres
router.use("/genres", genreRouter)

// POST /videogame; GET /videogame/:id
router.use("/videogame", gameRouter)

// GET /platforms
router.use("/platforms", platformRouter)

module.exports = router;