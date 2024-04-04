const router = require("express").Router()
const twoFactorRoutes = require("./twoFactorRoutes")

apiRoutes = require("./api")
htmlRoutes = require("./homeRoutes")

/* HTML routes */
// http:localhost:3001/
router.use("/", htmlRoutes)

/* API routes */
//http:localhost:3001/api
router.use("/api", apiRoutes)

// http://localhost:3001/api/authenticate
router.use("/authenticate", twoFactorRoutes)

module.exports = router