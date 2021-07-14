const router = require('express').Router();

const homeRoutes = require('./home_routes.js')

router.use('/', homeRoutes)

module.exports = router;