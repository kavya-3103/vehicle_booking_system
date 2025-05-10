const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST route for submitting bookings
router.post('/', bookingController.submitBooking);

module.exports = router;
