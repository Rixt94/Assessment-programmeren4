var express = require('express');
var routes = express.Router();
var deelnemerController = require('../routes/studentenhuis_routes');

module.exports = {}

routes.post('/studentenhuis', deelnemerController.makeStudenthome)
routes.get('/studentenhuis', deelnemerController.getAllStudenthome)
routes.get('/studentenhuis/:id', deelnemerController.getStudenthomeById)
routes.put('/studentenhuis/:id', deelnemerController.putStudenthome)
routes.delete('/studentenhuis/:id', deelnemerController.deleteStudenthome)


module.exports = routes