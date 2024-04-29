const mongoose=require('mongoose')

const Validation=new mongoose.Schema({
  email:String,
  OTP:String
})

module.exports=mongoose.model('otp',Validation)