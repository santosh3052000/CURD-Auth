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
        if(req.user.role === "admin"){
            let allUsers = await user.find({},{_id:0,username:1})
            return res.json({Data:allUsers})
        }
        return res.json({Message:'Only System Admin can fetch all users !'})
    }catch(err){
        next(err)
    }
}

routeFunc.update = async(req,res,next)=>{
    try{
        let loggedUser = req.user
        let toUpdateUser = await user.findOne({email:req.body.email},{password:0})
        if(toUpdateUser == null){
            return res.json({Message:"You can't modify other user details ! - No user !"})
        }
        if(toUpdateUser && loggedUser._id.toString() === toUpdateUser._id.toString()){
            let updatedUser = await user.findOneAndUpdate({email:req.user.email},
                {$set:{
                    username:req.body.username
                }},
                {new:true}
            ).select("-_id username email")
            return res.json({Message:'User updated !',From:req.user,To:updatedUser})
        }else{
            return res.status(403).json({Message:"You can't modify other user details !"})
        }
    }catch(err){
        next(err)
    }
}

routeFunc.delete = async(req,res,next)=>{
    try{
        let toDeleteUser = await user.findOne({username:req.body.username},{password:0})
        let loggedUser = req.user
        if(toDeleteUser == null){
            return res.json({Message:"You can't delete other user ! - No user !"})
        }
        if(toDeleteUser._id.toString() === loggedUser._id.toString()){
            await user.deleteOne({_id:req.user._id})
            return res.json({Message:`The user ${toDeleteUser.username} has been deleted !`})
        }else{
            return res.status(403).json({Message:"You can't delete other user !"})
        }
    }catch(err){
        next(err)
    }
}

module.exports = routeFunc