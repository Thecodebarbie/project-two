const router = require("express").Router()

// Importing the API endpoint routes
const userRoutes = require("./userRoutes")

// http://localhost:3001/api/user
router.use("/users", userRoutes)

module.exports = router

