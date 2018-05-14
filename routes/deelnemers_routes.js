var express = require('express');
var routes = express.Router();
var controller = require('../controllers/deelnemers_controller');

module.exports = {}

routes.post('/studentenhuis/:id/maaltijd/:maaltijdId', controller.postParticipant)
routes.get('/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers', controller.getAllParticipants)
routes.delete('/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers', controller.deleteParticipant)

module.exports = routes;