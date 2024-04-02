const sequelize = require('../config/connection');
const { Employee, Schedule } = require('../models');

const employeeData = require('./employeeData.json');
const scheduleData = require('./scheduleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const employees = await Employee.bulkCreate(employeeData, {
    individualHooks: true,
    returning: true,
  });

  for (const schedule of scheduleData) {
    await Schedule.create({
      ...schedule,
      employee_id: employees[Math.floor(Math.random() * employees.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
