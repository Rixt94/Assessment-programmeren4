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
               "firstname": "Jan",
               "lastname": "Smit",
               "email": "jsmit@server.nl",
               "password": "secret"
           })
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
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

            done();
        });
    done();
  });

  it('should throw an error when the user already exists', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "ABC",
              "lastname": "DEF",
              "email": "abc@def.nl",
              "password": "string"
          })
          .end((err, res) => {
              res.should.have.status(401);

              done();
          })
    done();
  });

  it('should throw an error when no firstname is provided', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "lastname": "DEF",
              "email": "abc@def.nl",
              "password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(412);

              done();
          });
  });

  it('should throw an error when firstname is shorter than 2 chars', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "A",
              "lastname": "DEF",
              "email": "abc@def.nl",
              "password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(412);

              done();
          });
  });

  it('should throw an error when no lastname is provided', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "DEF",
              "email": "abc@def.nl",
              "password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(412);

              done();
          });
  });

  it('should throw an error when lastname is shorter than 2 chars', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "ABC",
              "lastname": "D",
              "email": "abc@def.nl",
              "password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(412);

              done();
          });
  });

  it('should throw an error when email is invalid', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "ABC",
              "lastname": "DEF",
              "password": "string"
          })
          .end((err, res) =>{
              res.should.have.status(412);

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
                res.body.should.be.a('object');
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
                res.should.have.status(412)
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
                res.should.have.status(412)
                done()
            });
    })
});