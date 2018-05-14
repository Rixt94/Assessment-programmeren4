let express = require('express');
let routes = express.Router();
let controller = require('../controllers/studentenhuis_controller');

module.exports = {}

routes.post('/studentenhuis', controller.makeStudenthome);
routes.get('/studentenhuis', controller.getAllStudenthome);
routes.get('/studentenhuis/:id', controller.getStudenthomeById);
routes.put('/studentenhuis/:id', controller.putStudenthome);
routes.delete('/studentenhuis/:id', controller.deleteStudenthome);

module.exports = routes;