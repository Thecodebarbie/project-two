const router = require("express").Router()

apiRoutes = require("./api")
htmlRoutes = require("./homeRoutes")

/* HTML routes */
// http:localhost:3001/
router.use("/", htmlRoutes)

/* API routes */
//http:localhost:3001/api
router.use("/api", apiRoutes)

module.exports = router