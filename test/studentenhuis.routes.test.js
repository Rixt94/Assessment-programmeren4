const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Studentenhuis API POST', () => {
  it('should throw an error when using invalid JWT token', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    
    chai.request(server)
      .post('/api/studentenhuis')
      .set('X-Access-Token', "invalidToken")
      .send({
        "naam": "string",
        "adres": "string"
      })
      .end((err, res) => {
          res.should.have.status(404);
          done();
      });
    
  });

  it.skip('should return a studentenhuis when posting a valid object', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when naam is missing', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    
    chai.request(server)
      .post('/api/studentenhuis')
      .set('X-Access-Token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjczNDAyOTAsImlhdCI6MTUyNjQ3NjI5MCwic3ViIjozMiwidmFsIjoidGVzdDEifQ.VHu2q7htLqLsqRJIHYpMCTYS30NMTCDuKANbjFRMpVM")
      .send({
        "adres": "string"
      })
      .end((err, res) => {
          res.should.have.status(404);
          done();
      });
    
  });

  it('should throw an error when adres is missing', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    
    chai.request(server)
      .post('/api/studentenhuis')
      .set('X-Access-Token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjczNDAyOTAsImlhdCI6MTUyNjQ3NjI5MCwic3ViIjozMiwidmFsIjoidGVzdDEifQ.VHu2q7htLqLsqRJIHYpMCTYS30NMTCDuKANbjFRMpVM")
      .send({
        "naam": "string"
      })
      .end((err, res) => {
          res.should.have.status(404);
          done();
      });
    
  });
});

describe('Studentenhuis API GET all', () => {
  it('should throw an error when using invalid JWT token', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    
    chai.request(server)
      .get('/api/studentenhuis')
      .set('X-Access-Token', "invalidToken")
      .send(        
      )
      .end((err, res) => {
          res.should.have.status(404);
          done();
      });
    
  });

  it('should return all studentenhuizen when using a valid token', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    
    db.query('SELECT * FROM studentenhuis', (error, rows, fields) => {
      if(error){
        done();
      } else {
        
        chai.request(server)
          .get('/api/studentenhuis')
          .set('X-Access-Token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjczNDAyOTAsImlhdCI6MTUyNjQ3NjI5MCwic3ViIjozMiwidmFsIjoidGVzdDEifQ.VHu2q7htLqLsqRJIHYpMCTYS30NMTCDuKANbjFRMpVM")
          .send({
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.an('Array');
            
            done();
          });
      }
    });
  });
});

describe('Studentenhuis API GET one', () => {
  it('should throw an error when using invalid JWT token', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should return the correct studentenhuis when using an existing huisId', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should return an error when using an non-existing huisId', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });
});

describe('Studentenhuis API PUT', () => {
  it('should throw an error when using invalid JWT token', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should return a studentenhuis with ID when posting a valid object', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when naam is missing', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when adres is missing', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });
});

describe('Studentenhuis API DELETE', () => {
  it('should throw an error when using invalid JWT token', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should return a studentenhuis when posting a valid object', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when naam is missing', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });

  it('should throw an error when adres is missing', (done) => {
    //
    // Hier schrijf je jouw testcase.
    //
    done();
  });
});