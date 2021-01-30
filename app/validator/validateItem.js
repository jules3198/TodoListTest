const TodoList=require('../model/todoList');
const Item=require('../model/item');
const emailService=require('../validator/emailService')

function checkMinutes(d){
    let current = new Date().toISOString();
    let d1=new Date(current).getTime();
    let d2=new Date(d).getTime();
    let diff=(d1-d2)/1000;
    diff /= 60;
    let response=Math.abs(Math.round(diff));
    return response>30?true:false;
}

function validateItemCreation(todolistname,email){

    return new Promise(async (resolve,reject)=>{
        
        const todoList=await TodoList.findOne({name:todolistname}).populate('items');
            let len=todoList.items.length;
            let date;
            let resp;
            if(len==0){
                resolve(true)
            }else{
                date=todoList.items[len-1].creationDate
            if(len<=10 && checkMinutes(date)){
                if(len>7){
                   let options={
                    "email": email,
                    "subject": "Ajout Item",
                    "text": "Vous ne pouvez ajouter que deux items "
                   }
                    // call email Service
                    emailService.sendMail(options);
                }
                resolve(true)
            }else{
                reject(false)
                throw " can't create item";
            }
            }
            
    }) 
}

async function result(todolistname,email){
    console.log('before promise call');
    let resp;
    try{
      resp =  await validateItemCreation(todolistname,email);
    }catch(err){
        resp=err;
    }
    console.log('promise resolved: ' + resp)
        console.log('next step')
    return resp;
}


exports.validateItemCreation =validateItemCreation
exports.checkMinutes=checkMinutes
exports.Result = result