const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');

router.post('/register', captainController.registerCaptain);



module.exports = router;