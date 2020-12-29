const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoListSchema=new Schema({
    name:{type:String,require:true},
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{type:Schema.Types.ObjectId, ref: 'Item'}]

});


module.exports =mongoose.model("TodoList",TodoListSchema);

