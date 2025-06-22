const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../controllers/auth');
const { checkAdminAccess } = require('../helpers/auth');
const { 
    grantConductorAccess, 
    removeConductorAccess, 
    checkConductorAccessStatus, 
    createConductorRequest, 
    getAllConductorRequests, 
    getMyActiveRequests,
    denyConductorRequest,
    getActiveConductors 
} = require('../controllers/conductor');

router.post('/create-request', verifyJWT, createConductorRequest);
router.get('/requests', verifyJWT, getMyActiveRequests);
router.get('/requests/all', verifyJWT, checkAdminAccess, getAllConductorRequests);

router.post('/grant', verifyJWT, grantConductorAccess);
router.post('/deny', verifyJWT, checkAdminAccess, denyConductorRequest);
router.post('/remove', verifyJWT, removeConductorAccess);
router.get('/check', verifyJWT, checkConductorAccessStatus);
router.get('/get-active-conductors', verifyJWT, getActiveConductors);

module.exports = router;
