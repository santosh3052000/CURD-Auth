const jwt = require('jsonwebtoken')
const user = require('../model/userModel')


let authenticater = {}

authenticater.loginAuthenticator = (req,res,next)=>{
    try{ 
        let accessToken = jwt.sign({
            user:{
                id:req.user._id
            }
        },process.env.SECRET_STRING,{expiresIn:process.env.EXP_TIME})
        return res.json({Message:`Hi ${req.user.username} ! from authenticater :)`,Token:accessToken})
    }catch(err){
        next(err)
    }

}

authenticater.tokenCheck = async(req,res,next)=>{
    try{
        let token
        let auth = req.headers.authorization || req.headers.Authorization
        if(!auth){
            return res.status(401).json({
                message:"Authorization header missing"
            })
        }
        if(!auth.startsWith("Bearer ")){
            return res.status(401).json({
                message:"Invalid Authorization format"
            })
        }
        token = auth.split(' ')[1]
        const decoded = jwt.verify(token,process.env.SECRET_STRING)
        const existingUser = await user.findById(decoded.user.id,{password:0})
        if(!existingUser){
            return res.status(401).json({message:"Not user Found !"})
        }
        req.user = existingUser
        next()
    }catch(err){
        next(err)
    }
}

module.exports = authenticater