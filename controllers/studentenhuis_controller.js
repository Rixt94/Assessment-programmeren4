const auth =  require('../auth/authentication');
const assert = require('assert');
const db = require('../config/db');
const house = require('../model/StudentenHuis')

module.exports = {
  makeStudenthome(req, res, next) {
    console.log('make a student home');

    const id = req.body.id;
    const naam = req.body.naam;
    const adres = req.body.aders;
    const userId = req.body.userId
    console.log('We got id: ' + id + ' of ' + naam + ' locaded at ' + adres + ' form user: ' + userId)

    db.query('INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES (\' ' + naam + ' \', \' ' + adres +'  \', '+ userId +')', (error, rows, fields) => {
        if (error) {
            next(error);
        } else {
            res.status(200).json({
                result: rows
            }).end();
        }
    });
  },
  putStudenthome(req, res, next) {
      console.log('change a student home');

      const id = req.params.id;
      const naam = req.body.naam;
      const adres = req.body.aders;
      const userId = req.body.userId
      console.log('We got id: ' + id + ' of ' + naam + ' locaded at ' + adres + ' form user: ' + userId)

      db.query('UPDATE `studentenhuis`SET Naam=' + naam + ', Adres ' + adres + 'WHERE ID=' + id, (error, rows, fields) => {
          if (error) {
              next(error);
          } else {
              res.status(200).json({
                  result: rows
              }).end();
          }
      });
  },
  deleteStudenthome(req, res, next) {
    const id = req.params.id;
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