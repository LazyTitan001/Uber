const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller');

router.get('/get-coordinates', authMiddleware.authUser, mapController.getCoordinates);
router.get('/get-distance', authMiddleware.authUser, mapController.getDistance);
router.get('/get-suggestions', authMiddleware.authUser, mapController.getSuggestions);

module.exports = router;