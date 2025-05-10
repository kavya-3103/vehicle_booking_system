const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.get('/types', vehicleController.getVehicleTypesByWheels);
router.get('/', vehicleController.getVehiclesByType); // GET /api/vehicles?typeId=xyz


// New POST route for booking
//router.post('/booking', vehicleController.submitVehicleBooking);
module.exports = router;
