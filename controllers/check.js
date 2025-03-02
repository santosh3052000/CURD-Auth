const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../model/userModel')
let Check = {}

Check.Password = async(req,res,next)=>{
    try{
        const {email,password} = req.body
        let exUser = await user.findOne({email},{_id:0,email:1,password:1,username:1})
        const isMatch = await bcrypt.compare(password,exUser.password)
        if(exUser && isMatch){
            req.body = exUser
            console.log(exUser)
        }else{
            let err = new Error('Invalid email or password !')
            err.status = 401
            next(err)
        }
        next()
    }catch(err){
        next(err)
    }
}

Check.Token = async(req,res,next)=>{
    try{
        let token
        let auth = req.headers.authorization || req.headers.Authorization
        if(auth.startsWith('Bearer')){
            token = auth.split(' ')[1]
        }
        jwt.verify(token,process.env.SECRET_STRING,(er,decoded)=>{
            if(er){
                next(er)
            }
            console.log(decoded)
            req.user = decoded.user
        })
        next()
    }catch(err){
        next(err)
    }
}
module.exports = Check