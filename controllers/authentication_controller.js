const express = require('express');
const auth = require('../auth/authentication');
const assert = require('assert');
const expect = require('chai').expect;
const db = require('../config/db');

module.exports = {
  validate(req, res, next) {
    console.log("VALIDATE TOKEN");
    
    let token = (req.header('X-Access-Token')) || '';
    
    auth.decodeToken(token, (err, payload) => {
      if (err) {
        console.log('Error handler: ' + err.message);
        res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
      } else {
        next();
      }
    });
  },
  login(req, res, next) {
    //
    // Get body params or ''
    //
    
    let username = req.body.email || '';
    let password = req.body.password || '';
    
    // console.log(username);
    // console.log(password);
    
    
    db.query('SELECT ID, Email FROM user WHERE Email = "' + username + '" AND Password = "' + password + '"', (error, rows, fields) => {
      if(error) {
        next(error);
      } else {
        if(rows[0]) {
          // Generate JWT
          console.log(rows[0].Email);
          // res.sendStatus(200).json({"token" : auth.encodeToken(rows[0].Email), "username": rows[0].Email});
          res.status(200).json(auth.encodeToken(rows[0].Email)).end();
          
        } else {
          res.status(401).json({"error": "Invalid credentials"});
        }
      }
    });
  },
  register(req, res) {
    let firstname = req.body.firstname || '';
    let lastname = req.body.lastname || '';
    let email = req.body.email || '';
    let password = req.body.password || '';
    
    console.log('1');
    
    db.query('SELECT ID FROM user WHERE Email = "' + email + '"', (error, rows, fields) => {
      if(error) {
        next(error);
      } else {
        if(rows[0]) {
          //User exists
          res.status(409).json({"error": "User with that Email address already exists"});
        }
      }
    });
    
    console.log('2');
    
    db.query('INSERT INTO `user`(`Voornaam`, `Achternaam`, `Email`, `Password`) VALUES ("' + firstname + '","' + lastname + '","' + email + '","' + password + '")', (error, rows, fields) => {
      if(error) {
        console.log('err');
        next(error);
      } else {
        let token = auth.encodeToken(email);
        res.status(200).json({"token":token}).end();
      }
    });
  }
}