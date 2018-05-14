const auth =  require('../auth/authentication');
const assert = require('assert');

module.exports = {
  postMeal(req, res, next){

  },

  getAllMeals(req, res, next) {
    console.log("get all meals")
    db.query('SELECT * FROM maaltijd', (error, rows, fields) => {
      if(error) {
        next(error);
      } else {
        res.status(200).json({
          result: rows
        }).end();
      }
    });
  },

  getMealByID(req, res, next) {
    const id = req.params.maaltijdId;
    const userId = req.params.id;
    console.log("get meal with id: " + id);
    
    db.query('SELECT * FROM maaltijd WHERE ID=' + id + 'AND UserID = ' + userId, (error, rows, fields) => {
        if(error) {
            next(error);
        } else {
          res.status(200).json({
            result: rows
          }
        }).end();
    })
  },
  putMeal(req, res, next) {

  },
  deleteMeal (req, res, next) {

  }
}