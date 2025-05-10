const { PrismaClient } = require('./generated/prisma/client');
const prisma = new PrismaClient();


async function main() {
  // Create 3 car types (4-wheelers)
  const hatchback = await prisma.vehicleType.create({
    data: { name: 'Hatchback', wheels: 4 },
  });

  const suv = await prisma.vehicleType.create({
    data: { name: 'SUV', wheels: 4 },
  });

  const sedan = await prisma.vehicleType.create({
    data: { name: 'Sedan', wheels: 4 },
  });

  // Create 1 bike type (2-wheeler)
  const cruiser = await prisma.vehicleType.create({
    data: { name: 'Cruiser', wheels: 2 },
  });

  // Add vehicles for each type
  await prisma.vehicle.createMany({
    data: [
      { modelName: 'Maruti Swift', vehicleTypeId: hatchback.id },
      { modelName: 'Hyundai i20', vehicleTypeId: hatchback.id },
      { modelName: 'Toyota Fortuner', vehicleTypeId: suv.id },
      { modelName: 'Kia Seltos', vehicleTypeId: suv.id },
      { modelName: 'Honda City', vehicleTypeId: sedan.id },
      { modelName: 'Skoda Slavia', vehicleTypeId: sedan.id },
      { modelName: 'Royal Enfield Classic 350', vehicleTypeId: cruiser.id },
      { modelName: 'Harley Davidson Street 750', vehicleTypeId: cruiser.id },
    ],
  });

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
