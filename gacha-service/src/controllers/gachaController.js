const gachaService = require("../services/gachaService");
const Item = require("../models/Item");
const jsonString = `{
    "items": [
      {
        "name": "Sword of Destiny",
        "description": "A legendary sword",
        "img": "/path/to/item1.png",
        "ratio": 0.2
      },
      {
        "name": "Shield of Valor",
        "description": "A sturdy shield",
        "img": "/path/to/item2.png",
        "ratio": 0.15
      },
      {
        "name": "Potion of Healing",
        "description": "Restores 50 health points",
        "img": "/path/to/item3.png",
        "ratio": 0.3
      },
      {
        "name": "Amulet of Wisdom",
        "description": "Increases intelligence by 10 points",
        "img": "/path/to/item4.png",
        "ratio": 0.1
      },
      {
        "name": "Boots of Speed",
        "description": "Increases speed by 20%",
        "img": "/path/to/item5.png",
        "ratio": 0.05
      },
      {
        "name": "Ring of Power",
        "description": "Boosts all stats by 5%",
        "img": "/path/to/item6.png",
        "ratio": 0.2
      }
    ],
    "itemSets": [
      {
        "name": "Warrior's Set",
        "description": "A set for brave warriors",
        "items": [0, 1]
      },
      {
        "name": "Mage's Set",
        "description": "A set for wise mages",
        "items": [2, 3]
      },
      {
        "name": "Adventurer's Set",
        "description": "A set for swift adventurers",
        "items": [4, 5]
      }
    ]
  }`;
  
  

  
exports.createGachaData = async (req, res) => {
  try {
    // const { items, itemSets } = req.body;

    const images = req.files;
    const data = JSON.parse(jsonString);
    const items = data.items;
    const itemSets = data.itemSets;
    // Kiểm tra danh sách item và itemSet có hợp lệ không
    if (!Array.isArray(items) || !Array.isArray(itemSets)) {
      return res.status(400).json({ message: "Items and itemSets must be arrays" });
    }



   
    // Gửi dữ liệu đã kiểm tra tới service
    const gachaData = await gachaService.createGachaData(images, items, itemSets);
    
    res.status(201).json({ message: "Gacha data created successfully", data: gachaData });
  } catch (error) {
    res.status(500).json({ message: "Error creating gacha data", error: error.message });
  }
};

exports.getItemsByIds = async (req, res) => {
    try {
      const { itemIds } = req.body; // Lấy itemIds từ query parameter

      // Kiểm tra itemIds có tồn tại không và nó phải là một mảng
      if (!itemIds || !Array.isArray(itemIds)) {
        return res.status(400).json({ error: 'itemIds must be an array of IDs' });
      }
  
      // Tìm các item trong cơ sở dữ liệu bằng cách sử dụng itemIds
      const items = await Item.find({ _id: { $in: itemIds } });
  
      // Trả về danh sách item tìm được
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching items' });
    }
  };

  exports.getItemsByGameId = async (req, res) => {
    const { gameId } = req.params; // Lấy gameId từ params
  
    try {
      // Gọi service để lấy danh sách items
      const items = await gachaService.getItemsByGameId(gameId);
  
      // Trả về danh sách item
      res.status(200).json({
        message: 'Items retrieved successfully!',
        items: items
      });
    } catch (error) {
      console.error("Error fetching items by gameId:", error.message);
      res.status(500).json({ message: error.message });
    }
  };