const mongoose=require('mongoose')
mongoose.set('useFindAndModify', false);
const TodoList=require('../model/todoList');
const User = require('../model/User')
const checkTodoList = require('../validator/validateTodoList');




function respond(err, result, res) { 
    if (err) return res.status(500).json({error: err});
    return res.json(result);
}


const TodoListController={


    getAllTodoList:(req,res)=>{

        TodoList.find((err,result)=>{
            respond(err,result,res);
        });

    },
    getTodoListByName:(req,res)=>{
        let name=req.body.name
        TodoList.findOne({name:name},(err,result)=>{
            respond(err,result,res);
        });
    },
    createTodoList:async (req,res)=>{
       let name=req.body.name;
       let email=req.body.email;
       if(await checkTodoList(email)){
        User.findOne({ email: email },(error,user)=>{
            
            newTodoList=new TodoList({
                name:name,
                user:id
            });
            newTodoList.save((err,result)=>{
                 respond(err,result,res)
            });
        })      
           
       }else{
           res.send("not valid")
        }
    },
    updateTodoList:(req,res)=>{
        const newTodoList = new TodoList(req.body);
        TodoList.updateOne({name:req.body.name},newTodoList,(err,result)=>{
            respond(err,result,res);
        })
    },
    deleteTodoList:(req,res)=>{

        TodoList.deleteOne({name:req.body.name}, (err, result) => {
             return respond(err, result, res);
           });
    }

}

module.exports=TodoListController;