const user = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const routeFunc = {}

routeFunc.create = async(req,res,next)=>{
    try{
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password,12)
        let newUser = await user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone
        })
        res.json({Message:`Welcome ${newUser.username}!`}).status(201)
    }catch(err){
        next(err)
    }
}

routeFunc.login = async(req,res,next)=>{
    try{
        let ascessToken = jwt.sign({
            user:{
                username:req.body.username,
                email:req.body.email
            }
        },process.env.SECRET_STRING,{expiresIn:process.env.EXP_TIME})
        return res.json({Message:`Hi ${req.body.username} !`,Token:ascessToken})
    }catch(err){
        next(err)
    }
}

routeFunc.show = async(req,res,next)=>{
    try{
        //if(req.user.role === "admin"){
            let allUsers = await user.find({},{_id:0,username:1})
            return res.json({Data:allUsers})
        //}
        //return res.json({Message:'Only System Admin can fetch all users !'})
    }catch(err){
        next(err)
    }
}

routeFunc.update = async(req,res,next)=>{
    try{
        console.log("8 - update controller");
        let updatedUser = await user.findByIdAndUpdate(req.params.id,
            {$set:{
                username:req.body.username
            }},
            {new:true}
        ).select("-_id username email")
        if(!updatedUser){
            return res.status(404).json({Message:"User not found"})
        }
        return res.json({Message:'User updated !',From:req.user,To:updatedUser})
    }catch(err){
        next(err)
    }
}

routeFunc.delete = async(req,res,next)=>{
    try{
        console.log("8 - delete controller");
        await user.deleteOne({_id:req.params.id})
        return res.json({Message:`The user has been deleted !`})
    }catch(err){
        next(err)
    }
}

module.exports = routeFunc