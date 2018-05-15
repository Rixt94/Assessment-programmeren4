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
  //     chai.request(server)
  //         .post('/api/register')
  //         .send(register_details)
  //         .end((err, res) => { // when we get a response from the endpoint
  //             // in other words,
  //             // the res object should have a status of 201
  //             res.should.have.status(201);
  //             // the property, res.body.state, we expect it to be true.
  //             expect(res.body.state).to.be.true;
  //
  //             // follow up with login
  //             chai.request(server)
  //                 .post('/api/v1/auth/login')
  //                 .send(login_details)
  //                 .end((err, res) => {
  //                     res.should.have.status(200);
  //                     expect(res.body.state).to.be.true;
  //                     res.body.should.have.property('token');
  //
  //                     let token = res.body.token;
  //                     // follow up with requesting user protected page
  //                     done(); // Don't forget the done callback to indicate we're done!
  //                     })
  //                 })
  });

  it('should return an error on GET request', (done) => {
      chai.request(server)
        .get('/api/register')
        .end(function (err, res) {
            res.should.have.status(500);
            res.body.should.be.a('object');

            let error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(500)
            error.should.have.property('datetime')
            done();
        });
    done();
  });

  it('should throw an error when the user already exists', (done) => {
      chai.request(server)
          .post('api/register')
          .send([{
              "firstname": "ABC",
              "lastname": "DEF",
              "email": "abc@def.nl"
          },{
              "firstname": "ABC",
              "lastname": "DEF",
              "email": "abc@def.nl"
          }])
          .end((err, res) => {
              res.should.have.status(412);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(412)
              error.should.have.property('datetime')
              done();
          })
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
              res.should.have.status(412);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(412)
              error.should.have.property('datetime')
              done();
          });
  });

  it('should throw an error when firstname is shorter than 2 chars', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "AB",
              "lastname": "DEF",
              "email": "abc@def.nl"
          })
          .end((err, res) =>{
              res.should.have.status(412);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(412)
              error.should.have.property('datetime')
              done();
          });
  });

  it('should throw an error when no lastname is provided', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "DEF",
              "email": "abc@def.nl"
          })
          .end((err, res) =>{
              res.should.have.status(412);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(412)
              error.should.have.property('datetime')
              done();
          });
  });

  it('should throw an error when lastname is shorter than 2 chars', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "ABC",
              "lastname": "DEF",
              "email": "abc@def.nl"
          })
          .end((err, res) =>{
              res.should.have.status(412);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(412)
              error.should.have.property('datetime')
              done();
          });
  });

  it('should throw an error when email is invalid', (done) => {
      chai.request(server)
          .post('api/register')
          .send({
              "firstname": "ABC",
              "lastname": "DEF",
              "email": "abcdef.nl"
          })
          .end((err, res) =>{
              res.should.have.status(412);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(412)
              error.should.have.property('datetime')
              done();
          });
  });
});

describe('Login', () => {
  it('should return a token when providing valid information', (done) => {
      chai.request(server)
          .post('api/login')
          .send({
              "firstname": "ABC",
              "lastname": "DEF",
              "email": "abc@def.nl"
          })
          .end((err, res) =>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          })

    done();
  });

  it('should throw an error when email does not exist', (done) => {
      chai.request(server)
          .post('api/login')
          .send({
              "firstname": "ABC",
              "lastname": "DEF",
          })
          .end((err, res) =>{
              res.should.have.status(412);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(412)
              error.should.have.property('datetime')
              done();
          });
  });

  it('should throw an error when email exists but password is invalid', (done) => {
      chai.request(server)
          .post('api/login')
          .send({
              "firstname": "ABC",
              "lastname": "DEF",
              "email": "abc@def.nl"
          })
          .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');

              let error = res.body
              error.should.have.property('message')
              error.should.have.property('code').equals(401)
              error.should.have.property('datetime')
              done();
          })
  });

  it('should throw an error when using an invalid email', (done) => {
    chai.request(server)
        .post('api/login')
        .send({
            "firstname": "ABC",
            "lastname": "DEF",
            "email": "abcdef.nl"
        })
        .end((err, res) => {
            res.should.have.status(412);
            res.body.should.be.a('object');

            let error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')
            done();
        })
  });
});