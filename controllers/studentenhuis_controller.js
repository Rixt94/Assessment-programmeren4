//const auth =  require('../auth/authentication');
const assert = require('assert');
const db = require('../config/db');
const house = require('../model/StudentenHuis')

let houselist = [];

module.exports = {
  makeStudenthome(req, res, next) {
      console.log('make a student home');

      const id = req.body.id;
      const naam = req.body.Naam;
      const adres = req.body.Adres;
      const userId = req.body.UserID
      console.log('We got id: ' + id + ' of ' + naam + ' locaded at ' + adres + ' form user: ' + userId)

      let studenthome = new house(id, naam, adres, userId);
      // houselist.push(studenthome)

      assert(req.body.naam, "You must must give the house a name");
      assert(req.body.aders, "You must add your address");

      let home = req.body;
      let query ={
          sql: 'INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES (?, ?, ?)',
          values: [home.naam, home.aders, home.UserID]
      };

      console.dir(home);
      console.log("de query: " + query.sql);

      res.contentType('application/json');
      db.query(query , (error, rows, fields) => {
          if(error){
              res.status(400);
              res.json(error);
          }else {
              res.status(200);
              res.json(rows);
          }

      }).end();


    // db.query('INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES (\' ' + naam + ' \', \' ' + adres +'  \', '+ userId +')', (error, rows, fields) => {
    //     if (error) {
    //         next(error);
    //     } else {
    //         res.status(200).json({
    //             result: rows
    //         }).end();
    //     }
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