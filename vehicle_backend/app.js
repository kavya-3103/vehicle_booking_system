const express = require('express');
const cors = require('cors');

const vehicleRoutes = require('./routes/vehicleRoute');
const bookingRoutes = require('./routes/bookingRoute'); 


const app = express();

app.use(cors());
app.use(express.json()); // for parsing JSON

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);


module.exports = app;
