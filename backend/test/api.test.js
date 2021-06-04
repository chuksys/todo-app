process.env.NODE_ENV = "test"

const chai = require("chai")
const expect = chai.expect
const chaiHttp = require("chai-http")
chai.use(chaiHttp)

const startServer = require("../src/server")
let iserver;
const app = require("../src/app")
const database = require("../src/database")
const { v4: generateId } = require('uuid');

describe("Test API Endpoints /api/todos", function() {

    before(function(done) {
        startServer(app, database).then(server => {
            iserver = server
            done()
        })
    })

    after(function(done) {
        iserver.close()
        // clear test db
        // close db cxn too
        done()
    })

    describe("TEST GET endpoint", function() {
        it("Endpoint Works", function(done) {
            chai.request(iserver)
                .get("/api/todos?offset=0&limit=1")
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an("array").with.length.greaterThan(0)
                    expect(res.body[0]).to.have.own.property("id")
                    return done()
                })
        })

        it("Endpoint returns 400 when offset and limit query params aren't passed", function(done) {
            chai.request(iserver)
                .get("/api/todos")
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.be.status(400)
                    return done()
                })
        })

        it("Endpoint Returns Todos for given due date", function(done) {
            const todo = { id: generateId(), 
                text: "This is another Test Task", 
                completed: false, due_date: "2021-05-26" };

            database.client.db('todos').collection('todos').insertOne(todo);

            chai.request(iserver)
                .get("/api/todos?offset=0&limit=1&due_date=2021-05-26")
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.be.status(200)
                    expect(res.body[0]).contains({due_date: "2021-05-26"})
                    return done()
                })
        })

    })

    describe("TEST POST Endpoints", function() {
        it("Endpoint Works", function(done) {
            chai.request(iserver)
                .post("/api/todos")
                .send({"text": "This is a Test Task"})
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.own.property("text").to.be.equal("This is a Test Task")
                    expect(res.body).to.have.own.property("completed").to.be.equal(false)
                    expect(res.body).to.have.own.property("id")
                    return done()
                })
        })

        it("Endpoint returns 400 when invalid text value is passed in req.body", function(done) {
            chai.request(iserver)
                .post("/api/todos")
                .send({text: false})
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(400)
                    expect(res.body).is.eqls({ message: "invalid 'text' expected string" })
                    return done()
                })
        })
    })

    describe("TEST PUT Endpoints", function() {
        it("Updating of Todo Completed Works", function(done) {
            const todo = { id: generateId(),
                 text: "This is another Test Task",
                  completed: false };

            database.client.db('todos').collection('todos').insertOne(todo);
            chai.request(iserver)
                .put(`/api/todos/${todo.id}`)
                .send({completed: true})
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({message: "Todo Completion Status Updated"})
                    return done()
                })
        })

        it("Endpoint returns 404 if id param isn't passed", function(done) {
            const todo = { id: generateId(), 
                text: "This is another Test Task",
                 completed: false };

            database.client.db('todos').collection('todos').insertOne(todo);
            chai.request(iserver)
                .put(`/api/todos/`)
                .send({completed: true})
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(404)
                    return done()
                })
        })

        xit("Endpoint returns 404 if Todo doesn't exist for id param passed")

        it("Updating of Todo Due Date Works", function(done) {
            const todo = { id: generateId(), text: "This is another Test Task"};
            database.client.db('todos').collection('todos').insertOne(todo);
            chai.request(iserver)
                .put(`/api/todos/${todo.id}`)
                .send({due_date: "2021-06-01"})
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({message: "Due Date Updated"})
                    return done()
                })
        })

        xit("Updating of Todo Priority Works", function(done) {
            const todo = { id: generateId(), text: "This is another Test Task"};
            database.client.db('todos').collection('todos').insertOne(todo);
            chai.request(iserver)
                .put(`/api/todos/${todo.id}`)
                .send({priority: 2})
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({message: "Todo Priority Updated"})
                    return done()
                })
        })

        //valid values are completed, due_date, priority
        it("Endpoint returns 400 when invalid values are passed in req.body", function(done) {
            const todo = { id: generateId(), text: "This is another Test Task"};
            database.client.db('todos').collection('todos').insertOne(todo);
            chai.request(iserver)
                .put(`/api/todos/${todo.id}`)
                .send({invalid: true})
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(400)
                    expect(res.body).to.eql({message: "Bad Request"})
                    return done()
                })
        })
    })

    describe("TEST DELETE Endpoints", function() {
        it("Endpoint Works", function(done) {
            const todo = { id: generateId(), text: "This is another Test Task", completed: false };
            database.client.db('todos').collection('todos').insertOne(todo);
            chai.request(iserver)
                .delete(`/api/todos/${todo.id}`)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(203)
                    return done()
                })
        })

        it("Endpoint returns 404 if id param isn't passed", function(done) {
            const todo = { id: generateId(), text: "This is another Test Task", completed: false };
            database.client.db('todos').collection('todos').insertOne(todo);
            chai.request(iserver)
            .delete(`/api/todos/`)
            .end((err, res) => {
                if (err) return done(err)
                expect(res).to.have.status(404)
                return done()
            })
        })
        xit("Endpoint returns 404 if Todo doesn't exist for id param passed")
    })
})