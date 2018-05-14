var express = require('express');
var routes = express.Router();
var controller = require('../routes/deelnamers_routes');

module.exports = {}

routes.post('/studentenhuis/:id/maaltijd/:maaltijdId', controller.postMeal)
routes.get('/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers', controller.getMealByID)
routes.delete('/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers', controller.deleteMeal)


module.exports = routes