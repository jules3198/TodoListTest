var nodemailer = require('nodemailer');

async function sendMail(options){
  
return new Promise((resolve,reject)=>{
  let destinator=options["email"];
let subject=options["subject"];
let text=options["text"];

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'julestest31@gmail.com',
    pass: '1234ABC@'
  }
});



var mailOptions = {
  from: 'virusbo001@gmail.com',
  to: destinator,
  subject: subject ,
  text: text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log("error ",error)
   reject(false);
  } else {
    console.log("info ",info)
   resolve(true);
  }
});
})
}


exports.sendMail=sendMail