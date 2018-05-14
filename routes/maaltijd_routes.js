let express = require('express');
let routes = express.Router();
let controller = require('../controllers/maaltijd_controller');

module.exports = {}

routes.post('/studentenhuis/:id/maaltijd', controller.postMeal);
routes.get('/studentenhuis/:id/maaltijd', controller.getAllMeals);
routes.get('/studentenhuis/:id/maaltijd/:maaltijdId', controller.getMealByID);
routes.put('/studentenhuis/:id/maaltijd/:maaltijdId\'', controller.putMeal);
routes.delete('/studentenhuis/:id/maaltijd/:maaltijdId\'', controller.deleteMeal);

module.exports = routes;