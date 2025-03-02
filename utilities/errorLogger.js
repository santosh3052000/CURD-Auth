const fs = require('fs')

let ErrorLogger = async(err,req,res,next)=>{
    let errData = `Error: ${err.message} \n`
    fs.appendFile('./ErrorLogger.txt',errData,(er)=>{
        if(er){
            res.json({Message:'Internal server error !'}).status(500)
        }else{
            res.json({Message:'Error caught by ErrorLogger !',Error:errData})
        }
    })
}
module.exports = ErrorLogger