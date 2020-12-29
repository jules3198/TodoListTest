const Item=require('../model/item')
const Todolist=require('../model/todoList');
const ItemValidator=require('../validator/validateItem');

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
     let response=await ItemValidator.Result(req.body.todoListName)
    if( response==true){
        let current = new Date().toISOString();
        let newItem=new Item({
            name:req.body.name,
            content:req.body.content,
            creationDate:current
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