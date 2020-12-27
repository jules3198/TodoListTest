const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ItemSchema=new Schema({
    name:{type:String,required:true},
    content:{type:String,required:true},
    creationDate:{type:String,required:true},
});

module.exports =mongoose.model("Item",ItemSchema);