const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const token = "test"

chai.should();
chai.use(chaiHttp);

describe('deelnemers API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post('api/studentenhuis/1/maaltijd/1/deelnemers')
            .set('x-access-token', token)
            .send({
                "UserID": 1,
                "StudentenhuisID": 1,
                "MaaltijdID": 1
            })
            .end((err, res) =>{
                res.should.have.status(404);
                done();
            });
        done();
    });

    it('should throw an error when StudentenhuisID is missing', (done) => {
        chai.request(server)
            .post('/api/studentenhuis/54/maaltijd/1/deelnemers')
            .set('x-access-token', token)
            .send({
                "UserID": 1,
                "MaaltijdID": 1
            })
            .end((err, res) =>{
                res.should.have.status(404);

            });
        done();
    });

    it('should throw an error when MaaltijdID is missing', (done) => {
        chai.request(server)
            .post('/api/studentenhuis/1/maaltijd/54/deelnemers')
            .set('x-access-token', token)
            .send({
                "UserID": 1,
                "MaaltijdID": 1
            })
            .end((err, res) =>{
                res.should.have.status(404);

            });
        done();
    });
});

describe('deelnemers API GET', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get('api/studentenhuis/1/maaltijd/1/deelnemers')
            .set('x-access-token', token)
            .send({
                "UserID": 1,
                "StudentenhuisID": 1,
                "MaaltijdID": 1
            })
            .end((err, res) =>{
                res.should.have.status(404);
                done();
            });
        done();
        done();
    });
});

describe('deelnemers API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .delete('api/studentenhuis/1/maaltijd/1/deelnemers')
            .set('x-access-token', token)
            .send({
                "UserID": 1,
                "StudentenhuisID": 1,
                "MaaltijdID": 1
            })
            .end((err, res) =>{
                res.should.have.status(404);
                done();
            });
        done();
    });

    it('should return a participant when posting a valid object', (done) => {
        chai.request(server)
            .delete('api/studentenhuis/1/maaltijd/1/deelnemers')
            .send({
                "UserID": 1,
                "StudentenhuisID": 1,
                "MaaltijdID": 1
            })
            .end((err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object')

                done();
            });
    });

    it('should throw an error when StudentenhuisID is missing', (done) => {
        chai.request(server)
            .delete('api/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers')
            .send({
                "UserID": 1,
                "MaaltijdID": 1
            })
            .end((err, res) =>{
                res.should.have.status(404);

                done();
            });
    });

    it('should throw an error when MaaltijdID is missing', (done) => {
        chai.request(server)
            .delete('api/studentenhuis/:id/maaltijd/:maaltijdId/deelnemers')
            .send({
                "UserID": 1,
                "StudentenhuisID": 1
            })
            .end((err, res) =>{
                res.should.have.status(404);

                done();
            });
    });
});