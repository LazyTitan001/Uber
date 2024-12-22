const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rides.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create', authMiddleware.authUser, rideController.createRide);
router.get('/get-fare', authMiddleware.authUser, rideController.getFare);
router.post('/confirm',authMiddleware.authCaptain,rideController.confirmRide);



module.exports = router;