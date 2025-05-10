const { PrismaClient } = require('../prisma/generated/prisma');
const prisma = new PrismaClient();

// Submit booking
exports.submitBooking = async (req, res) => {
  const { firstName, lastName, startDate, endDate, vehicleId } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !startDate || !endDate || !vehicleId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate date logic
  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ message: 'Start date must be before end date.' });
  }

  try {
    // Check if the vehicle exists
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    });

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    // Check for overlapping bookings
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        vehicleId,
        startDate: { lt: new Date(endDate) },
        endDate: { gt: new Date(startDate) }
      }
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({ message: 'This vehicle is already booked for the selected dates.' });
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        firstName,
        lastName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        vehicle: {
          connect: { id: vehicleId }
        }
      }
    });

    return res.status(201).json({
      message: 'Booking successful.',
      booking
    });
  } catch (err) {
    console.error('Error submitting booking:', err);
    return res.status(500).json({ message: 'Server error while submitting booking.' });
  }
};
