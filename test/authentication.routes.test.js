/**
 * Testcases aimed at testing the authentication process. 
 */
 
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
          .send(register_details)
          .end((err, res) => { // when we get a response from the endpoint
              // in other words,
              // the res object should have a status of 201
              res.should.have.status(201);
              // the property, res.body.state, we expect it to be true.
              expect(res.body.state).to.be.true;

              // follow up with login
              chai.request(server)
                  .post('/api/v1/auth/login')
                  .send(login_details)
                  .end((err, res) => {
                      res.should.have.status(200);
                      expect(res.body.state).to.be.true;
                      res.body.should.have.property('token');

                      let token = res.body.token;
                      // follow up with requesting user protected page
                      done(); // Don't forget the done callback to indicate we're done!
                      })
                  })
  });

  it('should return an error on GET request', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when the user already exists', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when no firstname is provided', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "lastname": "DEF",
              "email": "abc@def.nl"
          })
          .end((err, res) =>{
              res.should.have.status(404);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(404)
              error.should.have.property('datetime')
              done();
          });
  });

  it('should throw an error when firstname is shorter than 2 chars', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when no lastname is provided', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "DEF",
              "email": "abc@def.nl"
          })
          .end((err, res) =>{
              res.should.have.status(404);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(404)
              error.should.have.property('datetime')
              done();
          });
  });

  it('should throw an error when lastname is shorter than 2 chars', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when email is invalid', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });
})

describe('Login', () => {
  it('should return a token when providing valid information', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when email does not exist', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when email exists but password is invalid', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when using an invalid email', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });
});