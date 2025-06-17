const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scan');

const { verifyJWT } = require('../controllers/auth');
const { checkConductorAccess } = require('../helpers/conductor');


router.get('/event-scans/:event_no', scanController.getEventScans);
router.get('/student-scans/:student_id', scanController.getStudentScans);
router.post('/create-scan', verifyJWT, checkConductorAccess, scanController.createScan);

module.exports = router;