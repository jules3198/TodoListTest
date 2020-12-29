const TodoList=require('../model/todoList');
const Item=require('../model/item');

function checkMinutes(d){
    let current = new Date().toISOString();
    let d1=new Date(current).getTime();
    let d2=new Date(d).getTime();
    let diff=(d1-d2)/1000;
    diff /= 60;
    let response=Math.abs(Math.round(diff));
    console.log("response",response)
    return response>1?true:false;
}

function validateItemCreation(todolistname){

    return new Promise(async (resolve,reject)=>{
        const todoList=await TodoList.findOne({name:todolistname}).populate('items');
        console.log("items ",todoList)
            let len=todoList.items.length;
            let date;
            let resp;
            date=todoList.items[len-1].creationDate
            if(len<=10 && checkMinutes(date)){
                if(len==7){
                console.log("send mail");
                }
                resolve(true)
            }else{
                reject(false)
                throw "";
            }
    }) 
}

async function result(todolistname){
    console.log('before promise call');
    let resp;
    try{
      resp =  await validateItemCreation(todolistname);
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