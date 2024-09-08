const db = require('../models/index.model.js');
const Event = db.event;
const { Op, Sequelize } = require('sequelize');

exports.createEvent = async (eventData) => {
  try {
    const newEvent = await Event.create(eventData);
    return newEvent;
  } catch (error) {
    throw new Error('Failed to create event: ' + error.message);
  }
};

exports.updateEvent = async (id, updatedData) => {
  try {
    const result = await Event.update(updatedData, {
      where: { id }
    });

    if (result[0] === 0) {
      throw new Error(`Event with ID ${id} not found or no changes were made`);
    }

    const updatedEvent = await Event.findByPk(id);
    return updatedEvent;
  } catch (error) {
    throw new Error('Failed to update event: ' + error.message);
  }
};

exports.deleteEvent = async (id) => {
  try {
    const result = await Event.destroy({
      where: { id }
    });

    if (result === 0) {
      throw new Error(`Event with ID ${id} not found`);
    }

    return { message: 'Event deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete event: ' + error.message);
  }
};

exports.getAllEvents = async () => {
  try {
    const events = await Event.findAll();
    return events;
  } catch (error) {
    throw new Error('Failed to retrieve events: ' + error.message);
  }
};

exports.getEventById = async (id) => {
  try {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }
    return event;
  } catch (error) {
    throw new Error('Failed to retrieve event: ' + error.message);
  }
};
exports.getEventsByBrandId = async (brandId) => {
  try {
    const events = await Event.findAll({
      where: { brand_id: brandId }
    });
    return events;
  } catch (error) {
    throw new Error('Failed to retrieve events by brand ID: ' + error.message);
  }
};
exports.getEventsBySearchQuery = async (page, search, brandID) => {
  try {
    // Đặt số lượng sự kiện trên một trang
    const limit = 8;
    // Tính toán offset dựa trên số trang
    const offset = (page - 1) * limit;
    console.log(page);
    console.log(search);
    console.log(brandID);
    // Tạo điều kiện tìm kiếm
    const whereClause = {
      name: {
        [Op.iLike]: `%${search}%` // Tìm kiếm không phân biệt chữ hoa chữ thường
      }
    };

    if (brandID) {
      whereClause.brand_id = brandID;
    }

    // Lấy danh sách sự kiện với phân trang và tìm kiếm
    const events = await Event.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [['id', 'ASC']] // Sắp xếp theo thời gian bắt đầu sự kiện
    });

    return {
      totalItems: events.count,
      totalPages: Math.ceil(events.count / limit),
      currentPage: page,
      data: events.rows
  };
  } catch (error) {
    throw new Error('Failed to retrieve events: ' + error.message);
  }
};
exports.getHighlightedEvents = async () => {
  return await Event.findAll({
    limit: 15,
    order: [['id', 'DESC']],
  });
};