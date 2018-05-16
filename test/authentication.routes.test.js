const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let validToken;

describe('Registration', () => {
   it('should return a token when providing valid information', (done) => {
       chai.request(server)
           .post('/api/register')
           .send({
               "voornaam": "Rixt",
               "achternaam": "Hoedt",
               "email": "test@avans.nl",
               "password": "geheimpje"
           })
           .end((err, res) => {
               res.should.have.status(200);
               //res.body.should.be.a('object');
               let validToken = res.body.token;

               const body = res.body;
               body.should.have.property('token');

               validToken.should.be.a('string')
               validToken = body.token;
               module.exports = {
                   token: validToken
               }
               done()
           });
  });

  it('should return an error on GET request', (done) => {
      chai.request(server)
        .get('/api/register')
        .end(function (err, res) {
            res.should.have.status(404);
        });
    done();
  });

  it('should throw an error when the user already exists', (done) => {
      chai.request(server)
          .post('/api/register')
          .send({
              "voornaam": "Jan",
              "achternaam": "Smit",
              "email": "jsmit@server.nl",
              "password": "secret"
          })
          .end((err, res) => {
              res.should.have.status(404);

              done();
          })
    done();
  });

  it('should throw an error when no firstname is provided', (done) => {
      chai.request(server)
          .post('/api/register')
          .send({
              "Achternaam": "DEF",
              "Email": "abc@def.nl",
              "Password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(404);
              done();
          });
  });

  it('should throw an error when firstname is shorter than 2 chars', (done) => {
      chai.request(server)
          .post('/api/register')
          .send({
              "Voornaam": "A",
              "Achternaam": "DEF",
              "Email": "abc@def.nl",
              "Password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(404);

              done();
          });
  });

  it('should throw an error when no lastname is provided', (done) => {
      chai.request(server)
          .post('/api/register')
          .send({
              "Voornaam": "DEF",
              "Email": "abc@def.nl",
              "Password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(404);

              done();
          });
  });

  it('should throw an error when lastname is shorter than 2 chars', (done) => {
      chai.request(server)
          .post('/api/register')
          .send({
              "Voornaam": "ABC",
              "Achternaam": "D",
              "Email": "abc@def.nl",
              "Password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(404);

              done();
          });
  });

  it('should throw an error when email is invalid', (done) => {
      chai.request(server)
          .post('/api/register')
          .send({
              "Voornaam": "ABC",
              "Achternaam": "DEF",
              "Password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(404);

              done();
          });
  });
});

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "jsmit@server.nl",
                "password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('object');
                let validToken = res.body.token;


                validToken.should.be.a('string');

                done()
            });
    });
    it('should throw an error when email does not exist', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "ghdfsa@server.nl",
                "password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            });

    });

    it('should throw an error when email exists but password is invalid', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "jsmit@server.nl",
                "password": "thegsadffff"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            });
    });

    it('should throw an error when using an invalid email', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "email": "abcdefg",
                "password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            });
    })
});