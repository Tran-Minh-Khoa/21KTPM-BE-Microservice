const db = require('../models/index.model.js');
const Redis = require("ioredis");
const Game = db.game
const { Op, Sequelize } = require('sequelize');

const redis = new Redis({
  port: 6379,
  host: 'redis',
});
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();

exports.createGame = async (gameData, file) => {
  try {

    const newGame = await Game.create(gameData);
    const imageUrl = await this.uploadImage(file, newGame.id);
    await Game.update({ poster: imageUrl }, { where: { id: newGame.id } });
    if (newGame.game_type_id === 1) {
      const roomData = {
        gameId: newGame.id,
        quizId: newGame.game_data_id,
        startTime: gameData.start_time
      }

      redis.publish("room_schedule", JSON.stringify(roomData));
    }

    return newGame;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create game');
  }
};

exports.updateGame = async (id, updatedData) => {
  try {
    const result = await Game.update(updatedData, {
      where: { id }
    });

    if (result[0] === 0) {
      throw new Error(`Game with ID ${id} not found or no changes were made`);
    }

    const updatedGame = await Game.findByPk(id);
    return updatedGame;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update game');
  }
};

exports.deleteGame = async (id) => {
  try {
    const result = await Game.destroy({
      where: { id }
    });

    if (result === 0) {
      throw new Error(`Game with ID ${id} not found`);
    }

    return { message: 'Game deleted successfully' };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete game');
  }
};

exports.getAllGames = async () => {
  try {
    const games = await Game.findAll();
    return games;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get games');
  }
};

exports.getGameById = async (id) => {
  try {
    const game = await Game.findByPk(id);
    return game;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get game');
  }
};
exports.searchGames = async (page, search, brandID) => {
  const whereClause = {
    name: {
      [Op.iLike]: `%${search}%`
    }
  };

  if (brandID) {
    whereClause.brand_id = brandID;
  }

  const limit = 8;
  const offset = (page - 1) * limit;

  const games = await Game.findAndCountAll({
    where: whereClause,
    limit: limit,
    offset: offset,
    order: [['id', 'DESC']]
  });

  return {
    totalItems: games.count,
    totalPages: Math.ceil(games.count / limit),
    currentPage: page,
    data: games.rows
  };
};


exports.getGamesByEventId = async (eventId) => {
  try {
    const games = await Game.findAll({
      where: { event_id: eventId },
    });
    return games;
  } catch (error) {
    throw new Error('Error fetching games: ' + error.message);
  }
};

exports.uploadImage = (file, id) => {
  return new Promise((resolve, reject) => {
    try {
      const filepath = `images/${file.fieldname}` + '/' + `${id}_${file.originalname}`;
      const blob = bucket.file(filepath);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', err => {
        console.error(err);
        reject('Error uploading file.');
      });

      blobStream.on('finish', () => {
        blob.getSignedUrl({
          action: 'read',
          expires: '12-12-2024'
        }, (err, signedUrl) => {
          if (err) {
            console.error('Error getting signed URL:', err);
            reject('Error getting file URL.');
          }
          console.log('File uploaded successfully.');
          resolve(signedUrl);
        });
      });

      blobStream.end(file.buffer);
    } catch (error) {
      console.error(error);
      reject('Error during file upload.');
    }
  });
};
exports.getHighlightedGames = async () => {
  return await Game.findAll({
    limit: 15,
    order: [['id', 'DESC']],
  });
};