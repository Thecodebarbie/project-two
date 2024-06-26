const router = require("express").Router()

// Importing the API endpoint routes
const employeeRoutes = require("./employeeRoutes")
const scheduleRoutes = require("./scheduleRoutes")
const scheduleSwapRoutes = require("./scheduleSwapRoute")
const callOffRoutes = require("./callRoutes")

const twoFactorRoutes = require("./twoFactorRoutes")

// http://localhost:3001/api/employees
router.use("/employees", employeeRoutes)

// http://localhost:3001/api/schedules
router.use("/schedules", scheduleRoutes)

// http://localhost:3001/api/scheduleswap
router.use("/scheduleswap", scheduleSwapRoutes)

// http://localhost:3001/api/calloff
router.use("/calloff", callOffRoutes)

// http://localhost:3001/api/authenticate
router.use("/authenticate", twoFactorRoutes)

module.exports = router
