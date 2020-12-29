var nodemailer = require('nodemailer');

function sendMail(options){
    
let destinator=options["email"];
let subject=options["subject"];
let text=options["text"];

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'virusbo001@gmail.com',
    pass: 'virusvirus'
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
   return false;
  } else {
   return true;
  }
});
}


exports.sendMail=sendMail