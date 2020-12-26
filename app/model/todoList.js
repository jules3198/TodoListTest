const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoListSchema=new Schema({
    name:{type:String,require:true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});


module.exports =mongoose.model("TodoList",TodoListSchema);