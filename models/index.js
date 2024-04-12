const Employee = require("./Employee")
const Schedule = require("./Schedule")
const Scheduleswap = require("./Scheduleswap")
const Calloff = require("./Calloff")

Employee.hasMany(Schedule, {
    foreignKey : "employee_id",
    onDelete : "CASCADE"
})

Schedule.belongsTo(Employee, {
    foreignKey : "employee_id"
})

Employee.hasMany(Scheduleswap, {
    foreignKey : "employee_id",
    onDelete : "CASCADE"
})

Scheduleswap.belongsTo(Employee, {
    foreignKey : "employee_id"
})

Scheduleswap.belongsTo(Schedule, {
    foreignKey : "schedule_id"
})

Employee.hasMany(Calloff, {
    foreignKey : "employee_id",
    onDelete : "CASCADE"
})

Calloff.belongsTo(Employee, {
    foreignKey : "employee_id"
})

Calloff.belongsTo(Schedule, {
    foreignKey : "schedule_id"
})

module.exports = { Employee, Schedule, Scheduleswap, Calloff}
