//apiTest.js
const request = require('supertest');
const app = require('../app');

const chai = require("chai");
const res = require("express");
const expect = chai.expect;



describe('POST /addUser', function () {

    let user = {

        "lastName": "tatoti",
        "firstName": "totita",
        "birthDate": "01-04-1993",
        "email": "bbg@cluster.fr",
        "password": "Test@1234",
    }

    it('create new user', function (done) {
        request(app)
            .post('/api/user/addUser')
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("result",res.body)
                let result = res.body;
                expect(result.status).to.be.equal('ok')
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"status code valid")
                //expect(201)
                done();
            });
    });

    it('not created new user', function (done) {
        request(app)
            .post('/api/user/addUser')
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("result",res.body)
                //let result = res.body;
                //expect(result).to.be.an('array')
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(400,"user not created")
                //expect(201)


                done();
            });
    });

    let data = {

        "lastName": "Benji",
        "firstName": "Belaja",
        "birthDate": "01-04-1993",
        "email": "benjiebelaja.fr",
        "password": "Test@1234",
    }

    it('not created new user with e-mail invalid', function (done) {
        request(app)
            .post('/api/user/addUser')
            .send(data)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("data",res.body)
                //let result = res.body;
                //expect(result).to.be.an('array')
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(400,"user not created, because email invalid")

                done();
            });
    });

    let creation = {

        "lastName": "gayant",
        "firstName": "Brice",
        "birthDate": "01/04-2010",
        "email": "gbe@b.fr",
        "password": "Test@1234",
    }

    it('not created new user with birthday invalid', function (done) {
        request(app)
            .post('/api/user/addUser')
            .send(creation)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("data",res.body)
                //let result = res.body;
                //expect(result).to.be.an('array')
                //expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(400,"user not created, because birthday invalid")

                done();
            });
    });
})

describe('GET /users', function () {
    it('returns list of all users', function (done) {
        request(app)
            .get('/api/user/listUser')
            .set('Accept', 'application/json')
            .end((err, res) => {
                console.log("result json object",res.body)
                expect('Content-Type', /json/)
                let result = res.body;
                expect(result).to.be.an('array')
                expect(res.statusCode).to.be.equal(200)
                done();
            });
    });
});

describe('GET /getUserByMail', function () {
    it('retrieve the current user according to his e-mail', function (done) {
        request(app)
            .get('/api/user/getUserByMail')
            .send({
                "email" : "bbg@cluster.fr"
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("data",res.body)
                let result = res.body;
                expect(result).to.be.an('object',"this is an object")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"Email user retrieve")

                done();
            });
         });
    });

    let currentUser = {

        "lastName": "BOURNE",
        "firstName": "Evan",
        "birthDate": "01-04-1992",
        "email": "guillaume@gmail.com",
        "password": "Lucamos93$",
    }

    describe('PUT /updateUser', function () {
        it('modify the current user according to his e-mail', function (done) {
            request(app)
                .put('/api/user/updateUser/bbg@cluster.fr')
                .send(currentUser)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) return done(err);
                    console.log("res",res.body)
                    let result = res.body;
                    expect(result.status).to.be.equal('ok',"this is ok response from the server")
                    expect('Content-Type', /json/)
                    expect(res.statusCode).to.be.equal(200,"user modified")

                    done();
                });
        });
});

describe('delete /deleteUser', function () {
    it('remove the current user according to his e-mail', function (done) {
        request(app)
            .delete('/api/user/deleteUser/guillaume@gmail.com')
            /*.send({
                "email" : "guillaume@gmail.com"
            })*/
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("suppression",res.body)
                let result = res.body;
                expect(result.status).to.be.equal('ok',"this is ok response from the server")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"user removed")

                done();
            });
    });
});