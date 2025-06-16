const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');

router.get('/getEvents', eventsController.getAllEvents);
router.post('/createEvent', eventsController.createEvent);
router.get('/past', eventsController.getPastEvents);
router.get('/upcoming', eventsController.getUpcomingEvents);
router.post('/edit/:event_no', eventsController.editEvent);

module.exports = router;