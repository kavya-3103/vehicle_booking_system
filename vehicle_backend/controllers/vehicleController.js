const { PrismaClient } = require('../prisma/generated/prisma');
const prisma = new PrismaClient();

// Get vehicle types based on wheels
exports.getVehicleTypesByWheels = async (req, res) => {
  const wheels = parseInt(req.query.wheels);

  if (!wheels || isNaN(wheels)) {
    return res.status(400).json({ message: 'Query parameter "wheels" is required and must be a number (2 or 4).' });
  }

  if (![2, 4].includes(wheels)) {
    return res.status(400).json({ message: 'Invalid wheels value. Please use 2 or 4.' });
  }

  try {
    const types = await prisma.vehicleType.findMany({ where: { wheels } });

    if (types.length === 0) {
      return res.status(404).json({ message: 'No vehicle types found for the given number of wheels.' });
    }

    return res.status(200).json(types);
  } catch (err) {
    console.error('Error fetching vehicle types:', err);
    return res.status(500).json({ message: 'Server error while fetching vehicle types.' });
  }
};

// Get vehicles by vehicle type ID
exports.getVehiclesByType = async (req, res) => {
  const typeId = parseInt(req.query.typeId);

  if (!typeId || isNaN(typeId)) {
    return res.status(400).json({ message: 'Query parameter "typeId" is required and must be a number.' });
  }

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { vehicleTypeId: typeId }
    });

    if (vehicles.length === 0) {
      return res.status(404).json({ message: 'No vehicles found for the given vehicle type ID.' });
    }

    return res.status(200).json(vehicles);
  } catch (err) {
    console.error('Error fetching vehicles by type:', err);
    return res.status(500).json({ message: 'Server error while fetching vehicles.' });
  }
};
