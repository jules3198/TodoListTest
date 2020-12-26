const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ItemSchema=new Schema({
    name:{type:String,required:true},
    content:{type:String,required:true},
    creationDate:{type:String,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TodoList'
    }
});

module.exports =mongoose.model("Item",ItemSchema);