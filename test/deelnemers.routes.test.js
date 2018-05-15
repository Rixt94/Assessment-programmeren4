const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('deelnemers API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it('should return a participant when posting a valid object', (done) => {
        chai.request(server)
            .post('api/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers')
            .send({
            "UserID": 1,
            "StudentenhuisID": 1,
            "MaaltijdID": 1
            })
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body
                response.should.have.property('UserID').equals(1)
                response.should.have.property('StudentenhuisID').equals(1)
                response.should.have.property('MaaltijdID').equals(1)
                done();
            });
    });

    it('should throw an error when StudentenhuisID is missing', (done) => {
        chai.request(server)
            .post('api/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers')
            .send({
                "UserID": 1,
                "MaaltijdID": 1
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

    it('should throw an error when MaaltijdID is missing', (done) => {
        chai.request(server)
            .post('api/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers')
            .send({
                "UserID": 1,
                "StudentenhuisID": 1
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
});

describe('deelnemers API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it('should return all participant when using a valid token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });
});

describe('deelnemers API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done();
    });

    it('should return a participant when posting a valid object', (done) => {
        chai.request(server)
            .post('api/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers')
            .send({
                "UserID": 1,
                "StudentenhuisID": 1,
                "MaaltijdID": 1
            })
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body
                response.should.have.property('UserID').equals(1)
                response.should.have.property('StudentenhuisID').equals(1)
                response.should.have.property('MaaltijdID').equals(1)
                done();
            });
        done();
    });

    it('should throw an error when StudentenhuisID is missing', (done) => {
        chai.request(server)
            .post('api/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers')
            .send({
                "UserID": 1,
                "MaaltijdID": 1
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

    it('should throw an error when MaaltijdID is missing', (done) => {
        chai.request(server)
            .post('api/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers')
            .send({
                "UserID": 1,
                "StudentenhuisID": 1
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
});