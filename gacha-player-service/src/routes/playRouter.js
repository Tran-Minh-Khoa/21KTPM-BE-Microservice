const express = require('express');
const router = express.Router();
const playController = require('../controllers/playController');

// API trừ lượt chơi và thêm item vào inventory
router.post('/use-play', playController.usePlayAndAddItem);
router.get('/playtime/:gameId', playController.getOrCreatePlaytime);

module.exports = router;
