const express = require('express');
const auth =  require('../auth/authentication');
const assert = require('assert')
const users = require()

module.exports = {

    validate(req, res, next){
        // console.log("VALIDATE TOKEN")
        //
        // var token = (req.header('X-Access-Token')) || '';
        //
        // auth.decodeToken(token, (err, payload) => {
        //     if (err) {
        //         console.log('Error handler: ' + err.message);
        //         res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
        //     } else {
        //         next();
        //     }
        // });
    },

    login(req, res){
        // //
        // // Get body params or ''
        // //
        // var username = req.body.username || '';
        // var password = req.body.password || '';
        //
        // //
        // // Check in datasource for user & password combo.
        // //
        // //
        // result = users.filter(function (user) {
        //     if( user.username === username && user.password === password) {
        //         return ( user );
        //     }
        // });
        //
        // // Debug
        // console.log("result: " +  JSON.stringify(result[0]));
        //
        // // Generate JWT
        // if( result[0] ) {
        //     res.status(200).json({"token" : auth.encodeToken(username), "username" : username});
        // } else {
        //     res.status(401).json({"error":"Invalid credentials, bye"})
        // }
    },

    register(req, res){

    }
}