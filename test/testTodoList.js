const chai = require("chai");
const assert = require('assert')
const expect = chai.expect;
const todoListValidator=require('../app/validator/validateTodoList')
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
const TodoList=require('../app/model/todoList')





describe('Testing first TodoList creation ', ()=>{
// User gwelle@myges.fr is already in our database for this test
  before('connection to mongoDB', function(){
    
   return  mongoose
    .connect(
      db,
      {useNewUrlParser: true  }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
})

// delete all existing todolist
beforeEach(function(){
  return TodoList.remove((err,result)=>{
  })
})

    it('should return true', async ()=> {
 
      let resp;
            resp= await  todoListValidator.Result("gwelle@myges.fr");
            expect(resp).to.be.true;
      });
 

    after('connection to mongoDB', function(){
      mongoose.disconnect()
    })

})


describe('Testing creation TodoList not existing user', ()=>{
// User jules is not in the database

  before('connection to mongoDB', function(){
    
   return  mongoose
    .connect(
      db,
      {useNewUrlParser: true  }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
})

    it('should return false', async ()=> {
 
     setTimeout(async()=>{
      let resp;
            resp= await  todoListValidator.Result("jules");
            expect(resp).to.be.false;
      });
     },100) 
 

    after('connection to mongoDB', function(){
      mongoose.disconnect()
    })

})

describe('Testing creation two TodoList for one existing user', ()=>{

  before('connection to mongoDB', function(){
    
   return  mongoose
    .connect(
      db,
      {useNewUrlParser: true  }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
})

// delete all existing todolist
beforeEach(function(){
  return TodoList.remove((err,result)=>{
  })
})

// creation of the first todolist
beforeEach(function(){
  var newTodoList = new TodoList({
      email: "gwelle@myges.fr",
      name: "test"
  });
  
  return newTodoList.save((err,result)=>{
  });
});


  it('should return false', async ()=> {
 
    setTimeout(async ()=>{
      let resp;
      // check for the creation of the second todolist
            resp= await  todoListValidator.Result("gwelle@myges.fr");
            expect(resp).to.be.false;
    },200)
     
   });
 

    after('connection to mongoDB', function(){
      mongoose.disconnect()
    })

})