const auth =  require('../auth/authentication');
const assert = require('assert');
var db = require('../config/db');

module.exports = {

  postParticipant(req, res, next) {
    console.log('added particitant to the mail');

    const UserID = req.body.UserID;
    const StudentenhuisID = req.body.StudentenhuisID;
    const MaaltijdID = req.body.MaaltijdID;
    console.log( voornaam +' ' + achternaam + 'is toegevoed aan de lijst');

    db.query('INSERT INTO `deelnemers` (UserID, StudentenhuisID, MaaltijdID) VALUES (' + UserID + ', ' + StudentenhuisID +', ' + MaaltijdID + ')', (error, rows, fields) => {
        if (error) {
            next(error);
        } else {
            res.status(200).json({
                result: rows
            }).end();
        }
    });
  },
  getAllParticipants(req, res, next) {
    console.log("get all participants");
    
    db.query('SELECT * FROM user', (error, rows, fields) => {
      if(error) {
        next(error);
      } else {
        res.status(200).json({
          result: rows
        }).end();
      }
    });
  },
  deleteParticipant(req, res, next) {
    const UserID = req.body.UserID;
    const StudentenhuisID = req.body.StudentenhuisID;
    const MaaltijdID = req.body.MaaltijdID;

        db.query('DELETE FROM `deelnemers` WHERE UserID = ' + UserID + ' AND StudentenhuisID = ' + StudentenhuisID + ' AND MaaltijdID =' + MaaltijdID, (error, rows, fields) => {
            if (error) {
                next(error);
            } else {
                console.log('You have deleted nr: ' + id);
                res.status(200).end();
            };
        });
}