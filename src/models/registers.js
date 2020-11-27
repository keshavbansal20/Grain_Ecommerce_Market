const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:true
    },
    gender: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    psw: {
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
    }
})

// now create collection

const Register = new mongoose.model("Register",CustomerSchema );

module.exports = Register;