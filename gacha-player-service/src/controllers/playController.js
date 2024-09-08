const playService = require('../services/playService');

// API khi người chơi sử dụng 1 lượt chơi
exports.usePlayAndAddItem = async (req, res) => {
    const { gameId,gameDataId } = req.body; // Lấy gameId và userId từ body request
    const userId = req.user.id;
    try {
        const result = await playService.usePlayAndAddItem(gameId,gameDataId, userId);

        // Trả về kết quả cho client
        res.status(200).json(result);
    } catch (error) {
        console.error("Error using play and adding item:", error.message);
        res.status(500).json({ message: error.message });
    }
};
exports.getOrCreatePlaytime = async (req, res) => {
    const {  gameId } = req.params;
    const userId = req.user.id;
    try {
      // Gọi service để lấy hoặc tạo lượt chơi
      const playtime = await playService.getOrCreatePlaytime(userId, gameId);
  
      // Trả về số lượt chơi còn lại
      res.status(200).json({
        message: "Playtime retrieved successfully!",
        play_duration: playtime.play_duration,
      });
    } catch (error) {
      console.error("Error in controller:", error.message);
      res.status(500).json({
        message: "Error retrieving playtime.",
        error: error.message,
      });
    }
  };