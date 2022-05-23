const { Router } = require('express');
const { getAllVideoGames } = require('../control/vgControl');

const router = Router();

router.use('/', getAllVideoGames);

router.get('/')

// router.get("/name", (req, res) => {
//     const { name } = req.query
// })

// router.get("/id", (req, res) => {
//     const { id } = req.body
// })

module.exports = router;