const User = require('../model/User')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var bcrypt=require('bcryptjs');
const validateUser= require('../validator/validateUser')


function respond(err, result, res) { 
    if (err) return res.status(500).json({error: err});
    return res.status(200).json(result);
}

function generatePwd(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;   
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

                let validateResponse= validateUser.isValid(newUser);
                if(validateResponse == true){
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                          if (err) throw err;
                          newUser.password = hash;
                          newUser
                            .save((err,result)=>{
                                respond(err,{status:"ok", statusCode:200},res)
                            })
                           
                        });
                    });   
                }else{
                    return res.status(400).json({ errors: validateResponse });
                }
                 
            }
        });      
    },
    updateUser:async (req,res)=>{
        let email = req.params.email;
       await User.findOne({email:email},async (err,user)=>{
            if(user){
                
                let id=user._id;
                const newUser = {
                    lastName: req.body.lastName ? req.body.lastName : user.lastName,
                    firstName: req.body.firstName ? req.body.firstName : user.firstName,
                    birthDate:req.body.birthDate ? req.body.birthDate : user.birthDate,
                    email: req.body.email ? req.body.email : user.email,
                    password: req.body.password ? generatePwd(req.body.password) : user.password
                };
                User.findOneAndUpdate({_id:id},newUser,(err,resp)=>{
                    if(err){
                        return res.status(400).json({ error: "Can't update" });
                    }else{
                        respond(err,{status:"ok", statusCode:200},res);
                    }
                });
            }else{
                return res.status(400).json({ email: "Email not exist" });
            }  
        });
    },
    deleteUser:async (req,res)=>{

        await User.findOne({email:req.params.email},async (err,user)=>{
            if(user){
                User.findOneAndRemove({email:req.params.email}, (err, result) => {
                    if(err){
                        return res.status(400).json({ email: "Can't delete" });
                    }else{
                        return respond(err, {status:"ok", statusCode:200}, res);
                    }
                });
            }else{
                return res.status(400).json({ email: "Email not exist" });
            }
        });        
    }

}

module.exports=UserController;