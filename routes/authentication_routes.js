let express = require('express');
let routes = express.Router();
let controller = require('../controllers/authentication_controller');

module.exports = {}

// routes.all(new RegExp("[^(\/login)]"), controller.validate);
routes.post('/login', controller.login);
routes.post('/register', controller.register);

module.exports = routes;