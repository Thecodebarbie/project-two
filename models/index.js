const Employee = require("./Employee")
const Schedule = require("./Schedule")
const Scheduleswap = require("./Scheduleswap")
const Calloff = require("./Calloff")

Employee.hasMany(Schedule, {
    foreignKey : employee_id,
    onDelete : "CASCADE"
})

Schedule.hasMany(Employee, {
    foreignKey : schedule_id
})

Employee.hasMany(Scheduleswap, {
    foreignKey : employee_id,
    onDelete : "CASCADE"
})

Scheduleswap.belongsTo(Employee, {
    foreignKey : employee_id
})

Scheduleswap.belongsTo(Schedule, {
    foreignKey : schedule_id
})

Employee.hasMany(Calloff, {
    foreignKey : employee_id,
    onDelete : "CASCADE"
})

Calloff.belongsTo(Employee, {
    foreignKey : employee_id
})

Calloff.belongsTo(Schedule, {
    foreignKey : schedule_id
})

/*User.hasMany(Schedule, {
    foreignKey : user_id,
    onDelete : "CASCADE"
})

Employee.belongsTo(User, {
    foreignKey : "user_id"
})

Employee.hasMany(Schedule, {
    foreignKey : "employee_id",
    onDelete : "CASCADE"
})

Schedule.belongsTo(Employee, {
    foreignKey : "employee_id"
})

Schedule.hasMany(Calloff, {
    foreignKey : "schedule_id",
    onDelete : "CASCADE"
})

Calloff.belongsTo(Schedule, {
    foreignKey : "schedule_id"
})

Calloff.belongsTo(Employee, {
    foreignKey : "employee_id"
})*/

module.exports = { Employee, Schedule, Scheduleswap, Calloff}
