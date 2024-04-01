const router = require("express").Router()

// Importing the API endpoint routes
const employeeRoutes = require("./employeeRoutes")

// http://localhost:3001/api/employees
router.use("/employees", employeeRoutes)

module.exports = router
