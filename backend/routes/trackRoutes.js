const express = require('express');
const router = express.Router();
const trackController = require('../controllers/tracks');

router.get('', trackController.getAllTracks);
router.post('/create-track', trackController.createTrack);
router.put('/update', trackController.updateTrack);
router.delete('/delete', trackController.deleteTrack);

module.exports = router;