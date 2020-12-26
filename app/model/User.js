const mongoose=require('mongoose');
const { stringify } = require('querystring');

const Schema=mongoose.Schema;

const UserSchema=new Schema({
    lastName: {type : String, required: true},
    firstName: {type : String, required:true},
    birthDate: {type:String,required:true},
    email: {type:String, required:true},
    password: {type:String,required:true}
});

module.exports = mongoose.model("User",UserSchema)