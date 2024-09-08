const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");
const multer = require("multer");
const multerStorage = multer.memoryStorage();

const multerUpload = multer({ storage: multerStorage });

router.post("/",multerUpload.single("poster"), gameController.createGame);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);
router.get('/all', gameController.getAllGames);
router.get('/search', gameController.searchGames);
router.get('/highlighted', gameController.getHighlightedGames);
router.get('/:id', gameController.getGameById);
router.get('/event/:eventId', gameController.getGamesByEvent);

module.exports = router;
