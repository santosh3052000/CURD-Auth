let authorization = {}

authorization.authorize = (...roles) =>{
    try{
        return (req,res,next) => {
        if(roles.includes(req.user.role)){
            return next()
        }else{
            return res.status(403).json({Message:"Forbidden: Insufficient permissions."})
        }
    }
    }catch(err){
        next(err)
    }
    
}

module.exports = authorization