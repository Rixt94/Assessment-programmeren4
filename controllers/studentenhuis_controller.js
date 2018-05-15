//const auth =  require('../auth/authentication');
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
      const naam = req.params.naam;
      const adres = req.params.adres;
      let userId = 1; // To be changed according to token values
      //const userId = req.body.UserID
      console.log('name of ' + naam + ' locaded at ' + adres + ' form user: ' + userId)

      try{
          //expect(id).to.be.at.least(0, "Id munst be a number and above 0");
          expect(naam).to.be.a('string');
          expect(adres).to.be.a('string');
          expect(naam).to.not.to.be.empty;
          expect(adres).to.not.to.be.empty;
          expect(naam.length).to.be.above(2, "the length of the name should be above 2 charcters");
          expect(adres.length).to.be.above(2, "the length of the adres should be above 2 charcters");
          expect(res.body).should.be.a('object');
      }catch(ex) {
          const error = new ApiError(ex.toString(), 422)
          next(error)
          return
      }

      let studenthome = new house(id, naam, adres, userId);
      houselist.push(studenthome)

    db.query('INSERT INTO `studentenhuis` (`Naam`, `Adres`, `UserID`) VALUES ( "' + naam + '", "' + adres + '", "' + userId +')', (error, rows, fields) => {
        if(error) {
            next(error);
        } else {
            console.log(req.body.id);
            res.sendStatus(200);
        }
    });

      // let home = req.body;
      // let query ={
      //     sql: 'INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES (?, ?, ?)',
      //     values: [home.naam, home.aders, home.UserID]
      // };
      //
      // console.dir(home);
      // console.log("de query: " + query.sql);
      //
      // res.contentType('application/json');
      // db.query(query , (error, rows, fields) => {
      //     if(error){
      //         res.status(400);
      //         res.json(error);
      //     }else {
      //         res.status(200);
      //         res.json(rows);
      //     }
      //
      // });
  },
  putStudenthome(req, res, next) {
      console.log('change a student home');

      const id = req.params.id;
      const naam = req.body.naam;
      const adres = req.body.aders;
      const userId = req.body.userId
      console.log('We got id: ' + id + ' of ' + naam + ' locaded at ' + adres + ' form user: ' + userId)

      var home = req.body;
      const id = req.params.id;
      var query ={
          sql: 'UPDATE `studentenhuis`SET Naam=?, Adres=? WHERE ID=?',
          values: [home.naam, home.aders, id]
      };

      console.dir(home);
      console.log("de query: " + query.sql);

      res.contentType('application/json');
      db.query(query , (error, rows, fields) => {
          if (error) {
              res.status(400);
              res.json(error);
          } else {
              res.status(200);
              res.json(rows);
          }
      }).end();

      // db.query('UPDATE `studentenhuis`SET Naam=' + naam + ', Adres ' + adres + 'WHERE ID=' + id, (error, rows, fields) => {
      //     if (error) {
      //         next(error);
      //     } else {
      //         res.status(200).json({
      //             result: rows
      //         }).end();
      //     }
      // });
  },
  deleteStudenthome(req, res, next) {
    const id = req.params.id;

      let home = req.body;
      const id = req.params.id;
      let query ={
          sql: 'DELETE FROM `studentenhuis WHERE ID=?',
          values: [id]
      };

      console.dir(home);
      console.log("de query: " + query.sql);

      res.contentType('application/json');

      const removedPerson = personlist.splice(id, 1)
      if(removedPerson.length === 1) {
          db.query(query , (error, rows, fields) => {
              if (error) {
                  res.status(400);
                  res.json(error);
              } else {
                  res.status(200);
                  res.json(rows);
              }
          }).end();
          //res.status(200).json(removedPerson).end();
      } else {
          let error = {
              message: "Person was not found"
          }
          next(error)
      }

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