const auth =  require('../auth/authentication');
const assert = require('assert');

module.exports = {
  makeStudenthome(req, res, next) {

  },
  putStudenthome(req, res, next) {

  },
  deleteStudenthome(req, res, next) {

  },
  getAllStudenthome(req, res, next) {
    console.log("get all studenthomes")
    
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