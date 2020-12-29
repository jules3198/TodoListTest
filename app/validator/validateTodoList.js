
const User = require('../model/User')
const TodoList=require('../model/todoList');




function response(val){ 
        resp=val; 
}

 function checkTodoList(email){

    return new Promise((resolve,reject)=>{
        User.findOne({ email: email }, (error,user)=>{
            if (user) {
              id=user._id;
              console.log("id",id)
              TodoList.findOne({user:id}, (error,todolist)=>{
                    if(todolist){
                        console.log("incorrectss")
                        reject(false)
                    }else{
                        console.log("correct")
                        resolve(true)
                    }
                });
            } else{
                console.log("incorrect")
                reject(false)
            } 
        });   
    })
 
}

async function result(email){

    console.log('before promise call');
    let resp;
    try{
      resp =  await checkTodoList(email);
    }catch(err){
        resp=err;
    }
    
    console.log('promise resolved: ' + resp)
        console.log('next step')
    
    return resp;
}

exports.Result = result