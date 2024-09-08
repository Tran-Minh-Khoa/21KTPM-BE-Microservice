const gameService = require('../services/game.service');

exports.createGame = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Bad Request' });
      return
    }

    const gameData = req.body;
    const file = req.file;
    const newGame = await gameService.createGame(gameData, file);

    res.status(201).json(newGame);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const updatedGame = await gameService.updateGame(req.params.id, req.body);
    res.status(200).json(updatedGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const response = await gameService.deleteGame(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllGames = async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const game = await gameService.getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.searchGames = async (req, res) => {
  try {
    const { page = 1, search = '', brandID } = req.query;

    const games = await gameService.searchGames(page, search, brandID);

    return res.json({ games });
  } catch (error) {
    console.error('Failed to retrieve games:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getGamesByEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const games = await gameService.getGamesByEventId(eventId);

    if (!games.length) {
      return res.status(404).json({ message: 'No games found for this event' });
    }

    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving games', error: error.message });
  }
};
exports.getHighlightedGames = async (req, res) => {
  try {
    const highlightedGames = await gameService.getHighlightedGames();
    res.json({ data: highlightedGames });
  } catch (error) {
    console.error('Failed to fetch highlighted games:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};