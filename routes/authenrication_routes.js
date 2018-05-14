var express = require('express');
var routes = express.Router();
var controller = require('../routes/authenrication_routes');

module.exports = {}

routes.all(new RegExp("[^(\/login)]"), controller.validate)
routes.post('/login', controller.login)
routes.post('/register', controller.register)


module.exports = routes