const express = require('express');
const auth = require('../auth/authentication');
const assert = require('assert');
const expect = require('chai').expect;
const db = require('../config/db');
const ApiError = require('../model/ApiError');

module.exports = {
  validate(req, res, next) {
    console.log("VALIDATE TOKEN");
    
    let token = (req.header('X-Access-Token')) || '';
    
    auth.decodeToken(token, (err, payload) => {
      if (err) {
        console.log('Error handler: ' + err.message);
        res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
      } else {
        // if token isset 
        req.header.tokenid = payload.sub;
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
    
    db.query('SELECT ID, Email FROM user WHERE Email = "' + username + '" AND Password = "' + password + '"', (error, rows, fields) => {
      if(error) {
        next(error);
      } else {
        if(rows[0]) {
          // Generate JWT
          res.status(200).json({
              token: auth.encodeToken(rows[0].ID),
              email: rows[0].Email
          }).end();
        } else {
          res.status(401).json({"error": "Invalid credentials"});
        }
      }
    });
  },
  register(req, res, next) {
    let firstname = req.body.firstname || '';
    let lastname = req.body.lastname || '';
    let email = req.body.email || '';
    let password = req.body.password || '';
    
      // Check if a user with that email address exists
    db.query('SELECT ID FROM user WHERE Email = "' + email + '"', (error, rows, fields) => {
      if(error) {
        next(error);
      } else {
        try {
          expect(rows.length).to.be.most(0);
            // Create user
          db.query('INSERT INTO `user`(`Voornaam`, `Achternaam`, `Email`, `Password`) VALUES ("' + firstname + '","' + lastname + '","' + email + '","' + password + '")', (error, rows, fields) => {
            if(error) {
              next(error);
            } else {
                // Get ID of created user
              db.query('SELECT ID FROM `user` WHERE Email = "' + email + '"', (error, rows, fields) => {
                if(error) {
                  next(error);
                } else {
                  let token = auth.encodeToken(rows[0].ID, email);
                  
                  res.status(200).json({"token":token}).end();
                }
              });
            }
          });
        } catch(ex) {
          console.log(ex.toString());
          const err = new ApiError(ex.toString(), 409);
          next(err);
        }
      }
    });
    
  }
}

