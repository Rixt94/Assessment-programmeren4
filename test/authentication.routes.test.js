const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken;

describe('Registration', () => {
   it('should return a token when providing valid information', (done) => {
       chai.request(server)
           .post('/api/register')
           .send({
               "Voornaam": "Jan",
               "Achternaam": "Smit",
               "Email": "jsmit@server.nl",
               "Password": "secret"
           })
           .end((err, res) => {
               res.should.have.status(200);
               //res.body.should.be.a('object');
               let validToken = res.body.token;

               validToken.should.be.a('string')
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
              "Voornaam": "ABC",
              "Achternaam": "DEF",
              "Email": "abc@def.nl",
              "Password": "string"
          })
          .end((err, res) => {
              res.should.have.status(401);

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
              res.should.have.status(412);
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
              res.should.have.status(412);

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
              res.should.have.status(412);

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
              res.should.have.status(412);

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
              res.should.have.status(401);

              done();
          });
  });
});

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "Email": "jsmit@server.nl",
                "Password": "secret"
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
                "Email": "ghdfsa@server.nl",
                "Password": "secret"
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
                "Email": "jsmit@server.nl",
                "Password": "thegsadffff"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when using an invalid email', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                "Email": "abcdefg",
                "Password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    })
});