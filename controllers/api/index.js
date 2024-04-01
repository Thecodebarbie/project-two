const router = require("express").Router()

// Importing the API endpoint routes
const employeeRoutes = require("./employeeRoutes")
const scheduleRoutes = require("./scheduleRoutes")
const scheduleSwapRoutes = require("./scheduleSwapRoutes")
const callOffRoutes = require("./callOffRoutes")

// http://localhost:3001/api/employees
router.use("/employees", employeeRoutes)

// http://localhost:3001/api/schedules
router.use("/schedules", scheduleRoutes)

// http://localhost:3001/api/scheduleswap
router.use("/scheduleswap", scheduleSwapRoutes)

// http://localhost:3001/api/calloff
router.use("/calloff", callOffRoutes)

module.exports = router
