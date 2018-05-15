//const auth =  require('../auth/authentication');
const assert = require('assert');
const db = require('../config/db');
const Participant = require('../model/Participant')

let participantslist = [];

module.exports = {

  postParticipant(req, res, next) {
    console.log('added particitant to the mail');

    const UserID = req.body.UserID;
    const StudentenhuisID = req.body.StudentenhuisID;
    const MaaltijdID = req.body.MaaltijdID;
    console.log( voornaam +' ' + achternaam + 'is toegevoed aan de lijst');

    let par = new Participant(UserID, )

      try{
          expect(UserID).to.be.at.least(0 ["Id munst be a number and above 0"]);
          expect(StudentenhuisID).to.be.at.least(0 ["UserId munst be a number and above 0"]);
          expect(MaaltijdID).to.be.at.least(0 ["UserId munst be a number and above 0"]);
          expect(UserID).to.not.to.be.empty;
          expect(StudentenhuisID).to.not.to.be.empty;
          expect(MaaltijdID).to.not.to.be.empty;
          expect(res.body).should.be.a('object');
      }catch(ex) {
          const error = new ApiError(ex.toString(), 422)
          next(error)
          return
      }

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

      try{
          expect(UserID).to.be.at.least(0 ["Id munst be a number and above 0"]);
          expect(StudentenhuisID).to.be.at.least(0 ["UserId munst be a number and above 0"]);
          expect(MaaltijdID).to.be.at.least(0 ["UserId munst be a number and above 0"]);
          expect(UserID).to.not.to.be.empty;
          expect(StudentenhuisID).to.not.to.be.empty;
          expect(MaaltijdID).to.not.to.be.empty;
          expect(res.body).should.be.a('object');
      }catch(ex) {
          const error = new ApiError(ex.toString(), 422)
          next(error)
          return
      }

        db.query('DELETE FROM `deelnemers` WHERE UserID = ' + UserID + ' AND StudentenhuisID = ' + StudentenhuisID + ' AND MaaltijdID =' + MaaltijdID, (error, rows, fields) => {
            if (error) {
                next(error);
            } else {
                console.log('You have deleted nr: ' + id);
                res.status(200).end();
            };
        });
}