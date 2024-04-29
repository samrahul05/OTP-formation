const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const schema = require('./schema');

mongoose.connect('mongodb://127.0.0.1:27017/OTP')
  .then(() => {
    console.log("Database is connected");
  })
  .catch(() => {
    console.log("Database is not connected");
  });
// middleware
  app.use(express.urlencoded({extended:false}))

  // Example route to send OTP via email
  app.post('/sendOTP', async (req, res) => {

    const details= new schema({
      ...req.body
     })
     
   // email    
   const { email } = req.body;  
   const generatedOTP = generateOTP();
   
    // Function to generate a random OTP
function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// Function to send OTP via email
function sendOTPByEmail(email, otp) {
  console.log(email)
  console.log(otp)
// const transporter = nodemailer.createTransport({
// service: 'gmail',
// auth: {
//   user: 'v4416143@gmail.com',
//   pass: 'uiof rxyb tkrr qser' // Use app password if required
  
// },
// });
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // TLS requires secureConnection to be false
  auth: {
        user: 'samrahul110@outlook.com', // Your Outlook email address
        pass: 'qfxyhfzmggofjrvi' // Your Outlook email password
    //  pass: 'CHJMF-Y6PDV-D7C5Q-Q2VDK-XA3QB',
  }
});

const mailOptions = {
from: 'samrahul110@outlook.com',
to:req.body.email,
subject: 'OTP Verification',
text: `Your OTP for verification is: ${otp}`,
};

transporter.sendMail(mailOptions, function (error, info) {
if (error) {
  console.log('Error sending email:', error);
} else {
  console.log('Email sent: ' + info.response);
}
});
}

   await details.save()
   .then(() =>{
    console.log("Saved succesfully");
   
})
.catch(()=>{
   console.log("Something Wrong");
   return res.json("Try Again")
  })

    // Here, save the generated OTP in your database or session for verification
    sendOTPByEmail(email, generatedOTP);
    res.send('OTP sent successfully');
  });

  
app.listen(6000, () => {
  console.log('Server is listening:6000');
});
