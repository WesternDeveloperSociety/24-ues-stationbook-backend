const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../controllers/auth');
const { grantConductorAccess, removeConductorAccess, checkConductorAccessStatus } = require('../controllers/conductor');

router.post('/grant', verifyJWT, grantConductorAccess);
router.post('/remove', verifyJWT, removeConductorAccess);
router.get('/check', verifyJWT, checkConductorAccessStatus);

module.exports = router;
