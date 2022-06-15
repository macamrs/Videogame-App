const { Router } = require('express');
const { getPlatforms } = require('../control/platformControl')

const router = Router();

// GET ALL PLATFORMS
// http://localhost:3001/platforms
router.get('/', getPlatforms)

module.exports = router;