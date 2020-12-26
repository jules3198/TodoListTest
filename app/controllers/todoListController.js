const mongoose=require('mongoose')
mongoose.set('useFindAndModify', false);
const TodoList=require('../model/todoList');
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
       console.log("ctr email",email);
       console.log("resultat" ,await checkTodoList(email))
       if(await checkTodoList(email)){
           res.send("valid")
       }else{
           res.send("not valid")
        }
    },
    updateTodoList:(req,res)=>{
        const newTodoList = new TodoList(req.body);
        TodoList.findByIdAndUpdate({name:req.body.name},newTodoList,(err,result)=>{
            respond(err,result,res);
        })
    },
    deleteTodoList:(req,res)=>{

        TodoList.findOneAndRemove({name:req.body.name}, (err, result) => {
             return respond(err, result, res);
           });
    }

}

module.exports=TodoListController;