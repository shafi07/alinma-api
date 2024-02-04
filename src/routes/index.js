const express = require("express");

const routes = express();

routes.use('/user', require('./user'))
routes.use('/javasath', require('./javasath'))
routes.use('/insurance', require('./insurance'))
routes.use('/work', require('./work'))
routes.use('/other', require('./other'))
routes.use('/visa', require('./visa'))
routes.use('/expense', require('./expense'))
routes.use('/agent', require('./agent'))

module.exports = routes