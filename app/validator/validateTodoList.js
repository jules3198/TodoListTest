
const User = require('../model/User')
const TodoList=require('../model/todoList');
const { response } = require('express');
async function checkTodoList(email){

    let response;
  await User.findOne({ email: email },(error,user)=>{
        if (user) {
          id=user._id;
          console.log("id",id)
            TodoList.findOne({user:id},(error,todolist)=>{
                if(todolist){
                    console.log("incorrectss")
                    response= false;

                }else{
                    console.log("correct")
                    response= true;
                    
                }
            });

        } else{
            console.log("incorrect")
            response= false; 
        } 
    });   
    
    return response;
}

module.exports = checkTodoList