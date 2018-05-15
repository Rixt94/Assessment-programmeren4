const assert = require('assert');
const db = require('../config/db');
const expect = require('chai').expect;
const house = require('../model/StudentenHuis');
const ApiError = require('../model/ApiError')

let houselist = [];

module.exports = {
    makeStudenthome(req, res, next) {
        console.log('make a student home');

        const id = 1;
        const naam = req.body.naam;
        const adres = req.body.adres;

        console.log(req.body);
        console.log("Naam: " + naam);
        console.log("Adres: " + adres);
        let userId = 1; // To be changed according to token values
        //const userId = req.body.UserID
        console.log('name of ' + naam + ' locaded at ' + adres + ' form user: ' + userId)

        let studenthome = new house(id, naam, adres, userId);
        houselist.push(studenthome)

        try{
            //expect(id).to.be.at.least(0, "Id munst be a number and above 0");
            expect(naam).to.be.a('string');
            expect(adres).to.be.a('string');
            expect(naam).to.not.to.be.empty;
            expect(adres).to.not.to.be.empty;
            expect(naam.length).to.be.above(2, "the length of the name should be above 2 charcters");
            expect(adres.length).to.be.above(2, "the length of the adres should be above 2 charcters");
            //expect(res.body).should.be.a('object');
        }catch(ex) {
            const error = new ApiError(ex.toString(), 422)
            next(error)
            return
        }

        db.query('INSERT INTO studentenhuis (Naam, Adres, UserID) VALUES ( "' + naam + '", "' + adres + '", "' + userId +'")', (error, rows, fields) => {
            if(error) {
                next(error);
            } else {
                console.log(req.body.id);
                res.sendStatus(200);
            }
        });
    },
  putStudenthome(req, res, next) {
      console.log('change a student home');

      const id = req.params.id;
      const naam = req.body.naam;
      const adres = req.body.adres;

      console.log(req.body);
      console.log("Naam: " + naam);
      console.log("Adres: " + adres);
      let userId = 1; // To be changed according to token values
      console.log('We got id: ' + id + ' of ' + naam + ' locaded at ' + adres + ' form user: ' + userId)


      try{
          //expect(id).to.be.at.least(0, "Id munst be a number and above 0");
          expect(naam).to.be.a('string');
          expect(adres).to.be.a('string');
          expect(naam).to.not.to.be.empty;
          expect(adres).to.not.to.be.empty;
          expect(naam.length).to.be.above(2, "the length of the name should be above 2 charcters");
          expect(adres.length).to.be.above(2, "the length of the adres should be above 2 charcters");
          //expect(res.body).should.be.a('object');
      }catch(ex) {
          const error = new ApiError(ex.toString(), 422)
          next(error)
          return
      }

      let studenthome = new house(id, naam, adres, userId);
      houselist.push(studenthome)

      db.query('UPDATE `studentenhuis` SET Naam = "' + naam + '", Adres = "' + adres + '"WHERE ID = ' + userId, (error, rows, fields) => {
          if(error) {
              next(error);
          } else {
              console.log(req.body.id);
              res.sendStatus(200);
          }
      });
  },
  deleteStudenthome(req, res, next) {
    const id = req.params.id;

      try{
          expect(id).to.exist;
          //expect(res.body).should
          // .be.a('object');
      }catch(ex) {
          const error = new ApiError(ex.toString(), 422)
          next(error)
          return
      }
      const naam = req.body.naam;
      const adres = req.body.adres;
      // db.query('SELECT ID FROM studentenhuis WHERE Name = "' + req.body.naam + '" AND Adres = "' + req.body.adres + '"',(error, rows, fields) => {
      //     if(error) {
      //         next(error);
      //     } else {
      //         if(!rows[0]) {
      //             //User exists
      //             res.status(409).json({"error": "Studenthome already deleted"});
      //         }
      //     }
      // });

      db.query('DELETE FROM studentenhuis WHERE ID='+ id, (error, rows, fields)  =>{
      if(error){
        next(error);
      }else{
        console.log('You have deleted nr: ' + id);
        res.status(200).end();
      }
      });

  },
  getAllStudenthome(req, res, next) {
    console.log("get all studenthomes");
    db.query('SELECT * FROM studentenhuis', (error, rows, fields) => {
      if(error){
        next(error);
      } else {
        res.status(200).json({
          result: rows
        }).end();
      }
    });
  },
  getStudenthomeById (req, res, next){
    const id = req.params.id;
    console.log("get studenthome with id: " + id);
    
    db.query('SELECT * FROM studentenhuis WHERE ID=' + id, (error, rows, fields) => {
      if(error){
          next(error);
      } else {
        res.status(200).json({
            result: rows
        }).end();
      }
    });
  }
}