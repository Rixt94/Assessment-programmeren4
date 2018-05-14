const auth =  require('../auth/authentication');
const assert = require('assert')
var db = require('../config/db');

module.exports = {
    postParticipant(req, res, next){

    },
    getAllParticipants(req, res, next){
        console.log("get all participants")
        db.query('SELECT * FROM user', function (error, rows, fields) {
            if(error){
                next(error)
            }else
                res.status(200).json({
                    result: rows
                }).end()
        })
    },
    deleteParticipant(req, res, next){

    }
}