
const User = require("./User")
const Employee = require("./Employee")
const Schedule = require("./Schedule")
const Calloff = require("./Calloff")

User.hasMany(Schedule, {
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
})

module.exports = { User, Employee, Schedule, Calloff}
