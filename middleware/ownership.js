const user = require('../model/userModel')

let ownership = async (req,res,next) => {
    try{
        console.log("5 - ownership middleware");
        if(req.user.role === "admin"){
            console.log("6 - Admin");
            return next()
        }
        else if(req.user.id.toString() === req.params.id){
            console.log("7 - Owner");
            return next()
        }
        else if(req.user.role === "manager"){
            console.log("6 - Manager");
            let employee = await user.findById(req.params.id,{password:0})
            if(employee && employee.role === "user"){
                return next()
            }
            else{
                return res.status(403).json({Message:"Forbidden: Insufficient permissions !"})
            }
        }
        else{
            return res.status(403).json({Message:"Forbidden: Insufficient permissions !"})
        }
    }catch(err){
        next(err)
    }
}
module.exports = ownership