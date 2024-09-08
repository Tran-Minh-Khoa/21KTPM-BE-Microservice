const eventService = require('../services/event.service');

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await eventService.createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const response = await eventService.deleteEvent(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    console.log(req.user.id);
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getEventsByBrandId = async (req, res) => {
  try {
    const brandId = req.params.brandId;
    const events = await eventService.getEventsByBrandId(brandId);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getEventsBySearchQuery = async (req, res) => {
  try {
    const { page = 1, search = '', brandID } = req.query;
    console.log(page);
    console.log(search);
    console.log(brandID);
    // Chuyển đổi page thành số nguyên
    const pageNumber = parseInt(page, 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ message: 'Invalid page number' });
    }

    // Lấy danh sách sự kiện từ service
    const events = await eventService.getEventsBySearchQuery(pageNumber, search, brandID);

    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getHighlightedEvents = async (req, res) => {
  try {
    const highlightedEvents = await eventService.getHighlightedEvents();
    res.json({ data: highlightedEvents });
  } catch (error) {
    console.error('Failed to fetch highlighted events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};