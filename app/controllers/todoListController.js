const mongoose=require('mongoose')
mongoose.set('useFindAndModify', false);
const TodoList=require('../model/todoList');
const User = require('../model/User');
const Item=require('../model/item')
const checkTodoList = require('../validator/validateTodoList');




function respond(err, result, res) { 
    if (err) return res.status(500).json({error: err});
    return res.status(200).json(result);
}

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}


const TodoListController={


    getAllTodoList:(req,res)=>{

        TodoList.find((err,result)=>{
            respond(err,result,res);
        });

    },
    getTodoListByName:(req,res)=>{
        let name=req.params.name
        TodoList.findOne({name:name},(err,result)=>{
            if(err){
                return res.status(400).json({ response: "Todolist not exist" });
            }else{
                respond(err,result,res);
            }
        });
    },
    createTodoList: async (req,res)=>{
       let name=req.body.name;
       let email=req.body.email;
       let response = await checkTodoList.Result(email)
       console.log("response ",response)
       if(response==true){
        User.findOne({ email: email },(error,user)=>{
            id=user._id
            newTodoList=new TodoList({
                name:name,
                user:id
            });
            newTodoList.save((err,result)=>{
                 respond(err,{status:"ok", statusCode:200},res)
            });
        })      
           
       }else{
           res.send("not valid")
        }
    },
    updateTodoList: async (req,res)=>{
        let name=req.params.name;
        await TodoList.findOne({name:name},(err,result)=>{

            if(result){
                newTodoList = {
                    name: req.body.name ? req.body.name : result.name,
                    user: result.user
                } 

                TodoList.findOneAndUpdate({name:name},newTodoList,(err,response)=>{
                    if(response){
                        respond(err,{status:"ok", statusCode:200},res);
                    }else{
                        return res.status(400).json({ response: "Can't update" });
                    }
                })
            }else{
                return res.status(400).json({ response: "Todolist not exist" });
            }
        });
        
    },
    deleteTodoList:(req,res)=>{

        let name=req.params.name;
        TodoList.findOne({name:name},(err,result)=>{
            if(result){
                TodoList.deleteOne({name:req.params.name}, (err, result) => {
                    if(err){
                        return res.status(400).json({ email: "Can't delete" }); 
                    }else{
                        respond(err, {status:"ok", statusCode:200}, res);
                    }
                });
            }else{
                return res.status(400).json({ response: "Todolist not exist" });
            }
        });
        
    }
}

module.exports=TodoListController;