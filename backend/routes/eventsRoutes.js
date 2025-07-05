const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');

router.get('/getEvents', eventsController.getAllEvents);
router.get('/:event_no', eventsController.getEventInfo);
router.post('/createEvent', eventsController.createEvent);
router.get('/past', eventsController.getPastEvents);
router.get('/upcoming', eventsController.getUpcomingEvents);
router.post('/edit/:event_no', eventsController.editEvent);
router.get('/track/:track-name', eventsController.getEventsByTrack);

module.exports = router;