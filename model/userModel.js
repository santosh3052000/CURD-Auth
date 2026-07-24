const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    username:String,
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    phone:Number,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }},
    {timestamps: true}
)

const userModel = mongoose.model('user',userSchema,'Users')

module.exports = userModel