
const User = require('../model/User')
const TodoList=require('../model/todoList');



 function checkTodoList(email){

    return new Promise((resolve,reject)=>{
        User.findOne({ email: email }, (error,user)=>{
            if (user) {
              id=user._id;
              TodoList.findOne({user:id}, (error,todolist)=>{
                    if(todolist){
                        reject(false)
                    }else{
                        resolve(true)
                    }
                });
            } else{
                reject(false)
            } 
        });   
    })
 
}

async function result(email){

    let resp;
    try{
      resp =  await checkTodoList(email);
    }catch(err){
        resp=err;
    }
  
    return resp;
}

exports.Result = result