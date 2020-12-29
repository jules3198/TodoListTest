const chai = require("chai");
const expect = chai.expect;
const itemValidator=require('../app/validator/validateItem')
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
const Item=require('../app/model/item')




describe('Testing first Item creation ', ()=>{
  // todolist test is already in our database for this test
    before('connection to mongoDB', function(){
      
     return  mongoose
      .connect(
        db,
        {useNewUrlParser: true  }
      )
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
  })
  
  // delete all existing item
  beforeEach(function(){
    return Item.remove((err,result)=>{
    })
  })
  
      it('should return true', async ()=> {
        setTimeout(async ()=>{
          let resp;
          resp= await  itemValidator.Result("test");
          expect(resp).to.be.true;
        },200)
       
      });
   
  
      after('connection to mongoDB', function(){
        mongoose.disconnect()
      })
  
  })


  
describe('Testing two creation without respect the minutes between two creation  ', ()=>{
  // todolist test is already in our database for this test
    before('connection to mongoDB', function(){
      
     return  mongoose
      .connect(
        db,
        {useNewUrlParser: true  }
      )
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
  })
  
    // delete all existing item
    beforeEach(function(){
      return Item.remove((err,result)=>{
      })
    })

        // creation of the first item
    beforeEach(function(){
      var newItem = new Item({
          
          name: "item 1",
          content:"content item2",
          todoListName: "test"
      });
      
      return newItem.save((err,result)=>{
      });
    });
  
      it('should return false', ()=> {
       
        setTimeout(async()=>{
          let resp;
          resp= await  itemValidator.Result("test");
          expect(resp).to.be.false;
        },200)
         
      
       
      });
   
  
      after('connection to mongoDB', function(){
        mongoose.disconnect()
      })
  
  })


  
