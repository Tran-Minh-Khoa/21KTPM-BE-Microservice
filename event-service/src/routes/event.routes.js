const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/all', eventController.getAllEvents);
router.get('/search', eventController.getEventsBySearchQuery);
router.get('/highlighted', eventController.getHighlightedEvents);
router.get('/:id', eventController.getEventById);
router.get('/brand/:brandId', eventController.getEventsByBrandId);

module.exports = router;
