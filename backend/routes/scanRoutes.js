const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scan');

router.get('/event-scans/:event_no', scanController.getEventScans);
router.get('/student-scans/:student_id', scanController.getStudentScans);
router.post('/create-scan', scanController.createScan);

module.exports = router;