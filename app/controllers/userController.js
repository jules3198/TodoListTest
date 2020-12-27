const User = require('../model/User')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var bcrypt=require('bcryptjs')


function respond(err, result, res) { 
    if (err) return res.status(500).json({error: err});
    return res.json(result);
}


const UserController={


    getAllUser:(req,res)=>{

        User.find((err,result)=>{
            respond(err,result,res);
        });
        
    },
    getUserByEmail:(req,res)=>{
        let email=req.body.email
        User.findOne({email:email},(err,result)=>{
            respond(err,result,res);
        });
    },
    createUser:(req,res)=>{

        User.findOne({ email: req.body.email },(error,user)=>{
            if (user) {
              return res.status(400).json({ email: "Email already exists" });
            } else {
      
                const newUser = new User({
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    birthDate:req.body.birthDate,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save((err,result)=>{
                            respond(err,result,res)
                        })
                       
                    });
                });    

            }
        });      
    },
    updateUser:(req,res)=>{
        const newUser = new User(req.body);

        User.updateOne({email:req.body.email},newUser,(err,result)=>{
            respond(err,result,res);
        })
    },
    deleteUser:(req,res)=>{

        User.findOneAndRemove({email:req.body.email}, (err, result) => {
             return respond(err, result, res);
           });
    }

}

module.exports=UserController;