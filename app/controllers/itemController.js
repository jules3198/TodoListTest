const Item=require('../model/item')
const Todolist=require('../model/todoList');
const ItemValidator=require('../validator/validateItem');
const User = require('../model/User')
function respond(err, result, res) { 
    if (err) return res.status(500).json({error: err});
    return res.json(result);
}
const ItemController={

    getAllItem: (req,res)=>{
        
        Item.find({},(err,result)=>{
            respond(err,result,res)
        })
    },
    
    getItemByName:(req,res)=>{
        let name=req.body.name
        Item.findOne({name:name},(err,result)=>{
            respond(err,result,res);
        });
    },

    createItem: async (req,res)=>{
     let email=req.body.email;
     let response=await ItemValidator.Result(req.body.todoListName,email)
    if( response==true){
        let current = new Date().toISOString();

        User.findOne({ email: email },(error,user)=>{

            if(user){
               let idUser=user._id;
                let newItem=new Item({
                    name:req.body.name,
                    content:req.body.content,
                    creationDate:current,
                    user:idUser
                });
                newItem.save((err,result)=>{
                    if(result){
                        let id=result._id;
                        console.log("id ",id)
                        Todolist.findOne({name:req.body.todoListName},(err,result1)=>{
                            if(result1){
                                let list=result1.items
                                list.push(id);
                                Todolist.updateOne({name:req.body.todoListName},{items:list},(err,result2)=>{
                                    respond(err,result2,res);
                                });
                            }
                        });  
                    }
                });
            }else{
                return res.status(400).json({ email: "Email not exists" });
            }
               
        })  
    }else{
        res.send("can't create item")
    }
       
    },
    
    updateItem:async (req,res)=>{
       let resp= await ItemValidator(req.body.todoListName);
       res.send(`result ${resp}`);
    },
    deleteItem:()=>{

    }
}


module.exports=ItemController