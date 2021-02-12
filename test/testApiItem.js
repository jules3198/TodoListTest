//apiTest.js
const request = require('supertest');
const app = require('../app');

const chai = require("chai");
const res = require("express");
const expect = chai.expect;

describe('POST /addItem', function () {

    it('create new item', function (done) {
        request(app)
            .post('/api/item/addItem')
            .send({

                "name" : "Item1",
                "content" : "Item3 todolist",
                "email" : "gwelle@myges.fr",
                "todoListName" : "TestTodoList"
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("result",res.body)
                let result = res.body;
                expect(result.status).to.be.equal('ok')
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"status code valid")
                done();
            });
    });

    it('not create new item', function (done) {
        request(app)
            .post('/api/item/addItem')
            .send({

                "name" : "Item2",
                "content" : "Item2 todolist",
                "email" : "gwelle@myges.fr",
                "todoListName" : "TestTodoList"
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);

                let result = res.text;
                console.log("##################################",result)
                expect(result).to.be.equal("can't create item")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(400,"status code valid")
                done();
            });
    });
});

describe('GET /items', function () {
    it('returns list of all items', function (done) {
        request(app)
            .get('/api/item/listItem')
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

describe('GET /getItemByName', function () {
    it('retrieve the current item according to his name', function (done) {
        request(app)
            .get('/api/item/getItemByName/Item1')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("data",res.body)
                let result = res.body;
                expect(result).to.be.an('object',"this is an object")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"item retrieve")

                done();
            });
    });
});

describe('PUT updateItem', function () {

    it('modify the current item user according to his name', function (done) {
        request(app)
            .put('/api/item/updateItem/Item1')
            .send({

                "name":"Item2",
                "content" : "Item2 todolist",
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("res",res.body)
                let result = res.body;
                expect(result.status).to.be.equal('ok',"this is ok response from the server")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"status code valid")

                done();
            });
    });
});

describe('PUT no updateItem', function () {

    it('no modify the current item user according to his name', function (done) {
        request(app)
            .put('/api/item/updateItem/Item1')
            .send({

                "name":"Item2",
                "content" : "Item2 todolist",
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("res",res.body)
                let result = res.body;
                expect(result.response).to.be.equal("Item not exist")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(400,"status code invalid")

                done();
            });
    });
});

describe('delete /deleteItem', function () {
    it('remove the current item according to his name', function (done) {
        request(app)
            .delete('/api/item/deleteItem/Item2')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("suppression",res.body)
                let result = res.body;
                expect(result.status).to.be.equal('ok',"this is ok response from the server")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"status code valid")

                done();
            });
    });
});

describe('PUT /no deleteItem', function () {

    it('no delete the current item user according to his name', function (done) {
        request(app)
            .delete('/api/item/deleteItem/Item2')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("res",res.body)
                let result = res.body;
                expect(result.response).to.be.equal("Item not exist")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(400,"status code invalid")

                done();
            });
    });
});

