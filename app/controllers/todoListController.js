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
   
    let array=[];
   for(el in arr){
       console.log("ele", el)
       if(arr[el].toString() != value.toString()){
           array.push(arr[el].toString());
       }
   }

   return array;
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
        
    },
    deleteTodoListItem:(req,res)=>{
        let todolistName=req.params.todolistName;
        let itemName=req.params.itemName;
        TodoList.findOne({name:todolistName},(err,result_todo)=>{
            if(result_todo){
                Item.findOne({name:itemName},(err,result_item)=>{
                    if(result_item){
                        let id_item=result_item._id;
                        console.log("item id", id_item)
                        console.log("old array", result_todo.items);
                        const item_array = arrayRemove(result_todo.items,id_item);
                        console.log("new array", item_array);
                        newTodoList = {
                            items: item_array,
                            name: result_todo.name,
                            user: result_todo.user
                        } 
                        TodoList.findOneAndUpdate({name:todolistName},newTodoList,(err,result)=>{
                           if(result){
                                respond(err, {status:"ok", statusCode:200}, res);
                           }else{
                            return res.status(400).json({ response: "Can't remove item" });
                           }
                        });
                    }else{
                        return res.status(400).json({ response: "Item not exist" }); 
                    }
                });
            }else{
                return res.status(400).json({ response: "Todolist not exist" });
            }
        });
    }

}

module.exports=TodoListController;