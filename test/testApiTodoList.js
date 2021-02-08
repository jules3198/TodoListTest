const request = require('supertest');
const app = require('../app');

const chai = require("chai");
const res = require("express");
const expect = chai.expect;

describe('GET /todoList', function () {
    it('returns list of all todoList', function (done) {
        request(app)
            .get('/api/todolist/listTodoList')
            .set('Accept', 'application/json')
            .end((err, res) => {
                console.log("result json array object",res.body)
                expect('Content-Type', /json/)
                let result = res.body;
                expect(result).to.be.an('array')
                expect(res.statusCode).to.be.equal(200)
                done();
            });
    });
});


let todolist = {

    "name" : "TodolistOfGuillaume",
    "email": "gwelle@myges.fr"
}

describe('POST /addTodoList', function () {

    it('create new todolist', function (done) {
        request(app)
            .post('/api/todolist/addTodoList')
            .send(todolist)
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

    it('not create new todolist', function (done) {
        request(app)
            .post('/api/todolist/addTodoList')
            .send(todolist)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("result",res.body)
                let result = res.body;
                expect(result.response).to.be.equal("can't add todolist")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(400,"status code valid")
                done();
            });
    });
});

describe('GET /getTodoListByName', function () {
    it('retrieve the current todolist according to his name', function (done) {
        request(app)
            .get('/api/todolist/getTodoListByName/TestTodoList')
            /*.send({
                "name" : "TodolistOfGuillaume"
            })*/
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("an todolist",res.body)
                let result = res.body;
                expect(result).to.be.an('object',"this is an object")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"Todolist user retrieve")

                done();
            });
    });
});

/*describe('delete /deleteTodolist', function () {
    it('remove the current todolist according to his name', function (done) {
        request(app)
            .delete('/api/todolist/deleteTodoList/TestTodoList')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("suppression",res.body)
                let result = res.body;
                //expect(result.status).to.be.equal('ok',"this is ok response from the server")
                expect(result.status).to.be.equal("ok","this is ok response from the server")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"todolist removed")

                done();
            });
    });
});

describe('no delete /deleteTodolist', function () {
    it('no remove the current todolist according to his name', function (done) {
        request(app)
            .delete('/api/todolist/deleteTodoList/TestTodoListe')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("result no suppression",res.body)
                let result = res.body;
                //expect(result.status).to.be.equal('ok',"this is ok response from the server")
                expect(result.response).to.be.equal("Todolist not exist")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(400,"status code valid")

                done();
            });
    });
});
*/
describe('PUT /updateTodolist', function () {

    it('modify the current todolist user according to his name', function (done) {
        request(app)
            .put('/api/todolist/updateTodoList/TodolistOfGuillaume')
            .send({

                "name":"test1"
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("res",res.body)
                let result = res.body;
                expect(result.status).to.be.equal('ok',"this is ok response from the server")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(200,"todolist modified")

                done();
            });
    });
});

describe('PUT /no updateTodolist', function () {

    it('no modify the current todolist user according to his name', function (done) {
        request(app)
            .put('/api/todolist/updateTodoList/TodolistOfGuillaume')
            .send({

                "name":"TodolistOfESGI"
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                console.log("res",res.body)
                let result = res.body;
                expect(result.response).to.be.equal("Todolist not exist")
                expect('Content-Type', /json/)
                expect(res.statusCode).to.be.equal(400,"status code valid")

                done();
            });
    });
});
