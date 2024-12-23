const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rides.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { body, query } = require('express-validator');


router.post('/create', authMiddleware.authUser, rideController.createRide);
router.get('/get-fare', authMiddleware.authUser, rideController.getFare);
router.post('/confirm',authMiddleware.authCaptain,rideController.confirmRide);
router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)



module.exports = router;