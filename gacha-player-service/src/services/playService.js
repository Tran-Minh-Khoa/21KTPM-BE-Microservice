const db = require('../models/index.model');
const Playtime = db.playTime;
const Inventory = db.inventory;
const axios = require('axios');
const { Op, Sequelize } = require('sequelize');

// Hàm để random một item từ danh sách item
const getRandomItem = (items) => {
    const totalRatio = items.reduce((acc, item) => acc + item.ratio, 0);
    let random = Math.random() * totalRatio;
    
    for (let item of items) {
        if (random < item.ratio) {
            return item;
        }
        random -= item.ratio;
    }
    return null;
};

exports.usePlayAndAddItem = async (gameId,gameDataId, userId) => {
    try {
        // Kiểm tra và trừ lượt chơi
    const playtime = await Playtime.findOne({ where: { game_id: gameId, user_id: userId } });
    if (!playtime || playtime.play_duration <= 0) {
        throw new Error("No playtime left for this game.");
    }

    // Trừ đi 1 play_duration
    playtime.play_duration -= 1;
    await playtime.save();
    console.log(`Remaining playtime: ${playtime.play_duration}}`);

    // Lấy danh sách items dựa trên gameId
    const response = await axios.get(`http://api-gateway:8000/gacha/itemsByGame/${gameDataId}`, {
        headers: {
            'Authorization': `Bearer ${process.env.authToken}` // Thêm trường Authorization
        }
    });
    const items = response.data.items;
    
    // Random ra một item
    const randomItem = getRandomItem(items);
    console.log(`Random item: ${randomItem.name}`);
    // Thêm item vào Inventory
    const newItem = await Inventory.create({
        game_id: gameId,
        user_id: userId,
        item: randomItem._id
    });

    return {
        message: "Item added to inventory!",
        item: randomItem,
        remainingPlayTime: playtime.play_duration
    };
    }
    catch (error) {
        throw new Error(`Error using play and adding item: ${error.message}`);
    }
};
exports.getOrCreatePlaytime = async (userId, gameId) => {
    try {
      // Kiểm tra xem lượt chơi của user và game này có tồn tại không
      let playtime = await Playtime.findOne({
        where: {
          [Op.and]: [{ user_id: userId }, { game_id: gameId }]
        }
      });
  
      // Nếu không tìm thấy, tạo mới với play_duration mặc định là 10
      if (!playtime) {
        playtime = await Playtime.create({
          user_id: userId,
          game_id: gameId,
          play_duration: 10, // Mặc định 10 lượt chơi
        });
      }
  
      // Trả về đối tượng playtime
      return playtime;
    } catch (error) {
      throw new Error(`Error retrieving or creating playtime: ${error.message}`);
    }
  };