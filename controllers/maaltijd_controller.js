const auth =  require('../auth/authentication');
const assert = require('assert');
const expect = require('chai').expect;
const db = require('../config/db');
const ApiError = require('../model/ApiError');
const t = require('../auth/authentication');

module.exports = {
  postMeal(req, res, next){
    console.log('Post new meal for house : ');

    let userId = 1; // To be changed according to token values

    try {
      assert(typeof (req.body.naam) === 'string', 'Naam must be a string');
      assert(typeof (req.body.beschrijving) === 'string', 'beschrijving must be a string');
      assert(typeof (req.body.ingredienten) === 'string', 'Ingredienten must be a string');
      assert(typeof (req.body.allergie) === 'string', 'Allergie must be a string');
      expect(req.body.prijs).to.be.a('number', 'Prijs 1');
      expect(req.body.prijs % 1).to.be.equal(0, 'Prijs 2');
      // expect(req.body.userId).to.be.a('number', 'UserId 1');   
      // expect(req.body.userId % 1).to.be.equal(0, 'UserId 2');
      // expect(req.params.id).to.be.a('number', 'HuisId 1');     
      // expect(req.params.id % 1).to.be.equal(0, 'HuisId 2');
      expect(req.body.prijs).to.be.least(0, "Prijs");

      // Test of er een huis met ID bestaat
      
      db.query('INSERT INTO `maaltijd`(`Naam`, `Beschrijving`, `Ingredienten`, `Allergie`, `Prijs`, `UserID`, `StudentenhuisID`) VALUES ( "' + req.body.naam + '", "' + req.body.beschrijving + '", "' + req.body.ingredienten + '", "' + req.body.allergie + '", ' + req.body.prijs + ', ' + userId + ', ' + req.params.id + ' )', (error, rows, fields) => {
        if(error) {
          next(error);
        } else {
          console.log(req.body.id);
          res.sendStatus(200);
        }
      });
    
    } catch(ex) {
      console.log(ex.toString());
      const error = new ApiError(ex.toString(), 422);
      next(error);
      return;
    }

    
  },

  getAllMeals(req, res, next) {
    console.log("get all meals");

    db.query('SELECT * FROM maaltijd', (error, rows, fields) => {
      if(error) {
        next(error);
      } else {
        res.sendStatus(200).json({
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
          res.sendStatus(200).json({
            result: rows
          }).end();
        }
    });
  },
  putMeal(req, res, next) {
    
    let userId = 1;
    
    try {
      assert(typeof (req.body.naam) === 'string', 'Naam must be a string');
      assert(typeof (req.body.beschrijving) === 'string', 'beschrijving must be a string');
      assert(typeof (req.body.ingredienten) === 'string', 'Ingredienten must be a string');
      assert(typeof (req.body.allergie) === 'string', 'Allergie must be a string');
      expect(req.body.prijs).to.be.a('number', 'Prijs 1');
      expect(req.body.prijs % 1).to.be.equal(0, 'Prijs 2');
      // expect(req.body.userId).to.be.a('number', 'UserId 1');   
      // expect(req.body.userId % 1).to.be.equal(0, 'UserId 2');
      // expect(req.params.id).to.be.a('number', 'HuisId 1');     
      // expect(req.params.id % 1).to.be.equal(0, 'HuisId 2');
      expect(req.body.prijs).to.be.least(0, "Prijs");
      
      // Test of er een huis met ID bestaat
      // Test of maaltijd met ID bestaat
      
      db.query('UPDATE `maaltijd` SET `Naam`="'+req.body.naam+'",`Beschrijving`="'+req.body.beschrijving+'",`Ingredienten`="'+req.body.ingredienten+'",`Allergie`="'+req.body.allergie+'",`Prijs`='+req.body.prijs+' WHERE `ID`=' + req.params.maaltijdId + ' AND `StudentenhuisID`=' + req.params.id + ' AND `UserID`='+userId, (error, rows, fields) => {
        if(error) {
            next(error);
        } else {
          res.sendStatus(200);
        }
      });
    
    } catch(ex) {
      console.log(ex.toString());
      const error = new ApiError(ex.toString(), 422);
      next(error);
      return;
    }
    
  },
  deleteMeal (req, res, next) {
    
    let userId = 1;
    
    try {
      // expect(req.body.userId).to.be.a('number', 'UserId 1');   
      // expect(req.body.userId % 1).to.be.equal(0, 'UserId 2');
      // expect(req.params.id).to.be.a('number', 'HuisId 1');     
      // expect(req.params.id % 1).to.be.equal(0, 'HuisId 2');
      
      // Test of er een huis met ID bestaat
      // Test of maaltijd met ID bestaat
      
      db.query('DELETE FROM `maaltijd` WHERE `ID`=' + req.params.maaltijdId + ' AND `StudentenhuisID`=' + req.params.id + ' AND `UserID`='+userId, (error, rows, fields) => {
        if(error) {
            next(error);
        } else {
          res.sendStatus(200);
        }
      });
    
    } catch(ex) {
      console.log(ex.toString());
      const error = new ApiError(ex.toString(), 422);
      next(error);
      return;
    }
    
  }
}