const express = require("express");

const routes = express();

routes.use('/user', require('./user'))
routes.use('/javasath',require('./javasath'))
routes.use('/insurance',require('./insurance'))
routes.use('/work',require('./work'))

module.exports = routes