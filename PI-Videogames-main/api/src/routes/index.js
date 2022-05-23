const { Router } = require('express');
const vgRouter = require('./vgRouter');
const genreRouter = require('./genreRouter')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// Hacer callbacks de los errores

router.use("/videogames", vgRouter)
router.use("/genres", genreRouter)

module.exports = router;
