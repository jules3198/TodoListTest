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
    return response>=30?true:false;
}



async function validateItemCreation(todolistname){
    const todoList= await TodoList.findOne({name:todolistname}).populate('items');
    let len=todoList.items.length;
    let date;
    let resp;
    date=todoList.items[len-1].creationDate
    if(len<=10 && checkMinutes(date)){
         resp=true
         if(len==7){
           console.log("envoie mail")
         }
    }else{
        throw "can't add new item"
    }
    return resp;
}


module.exports=validateItemCreation