const user = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const routeFunc = {}

routeFunc.create = async(req,res,next)=>{
    try{
        const password = req.body.password
        hashedPassword = await bcrypt.hash(password,12)
        let newUser = await user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            systemAdmin: req.body.systemAdmin
        })
        res.json({Message:`Welcome ${newUser.username} !`}).status(201)
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
        res.json({Message:`Hi ${req.body.username} !`,Token:ascessToken})
    }catch(err){
        next(err)
    }
}

routeFunc.show = async(req,res,next)=>{
    try{
        let isAdmin = await user.findOne({email:req.user.email})
        if(isAdmin.systemAdmin){
            let allUsers = await user.find({},{_id:0,username:1})
            res.json({Data:allUsers})
        }
        res.json({Message:'Only System Admin can fetch all users !'})
    }catch(err){
        next(err)
    }
}

routeFunc.update = async(req,res,next)=>{
    try{
        let loggedUser = await user.findOne({email:req.user.email},{password:0})
        let toupdateUser = await user.findOne({email:req.body.email},{password:0})
        if(loggedUser._id.toString() === toupdateUser._id.toString()){
            let updatedUser = await user.findOneAndUpdate({email:req.user.email},
                {$set:{
                    username:req.body.username
                }},
                {new:true}
            ).select("-_id username email")
            res.json({Message:'User updated !',From:req.user,To:updatedUser})
        }else{
            res.json({Message:'You cant modify other user details !'})
        }
    }catch(err){
        next(err)
    }
}

routeFunc.delete = async(req,res,next)=>{
    try{
        let todeleteUser = await user.findOne({_id:req.params.id})
        let loggedUser = await user.findOne({username:req.user.username})
        if(todeleteUser._id.toString() === loggedUser._id.toString()){
            await user.deleteOne({_id:req.params.id})
            res.json({Message:`The user ${todeleteUser.username} has been deleted !`})
        }else{
            res.json({Message:'You cant delete other user !'})
        }
    }catch(err){
        next(err)
    }
}

module.exports = routeFunc