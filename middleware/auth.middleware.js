const jwt = require("jsonwebtoken")

const Authorization = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, "masai",(err,decode)=>{
            if(decode){
                req.body.user = decode.userID
                next()
            }else{
                res.send({"msg":"please Login"})
            }
        })
    }else{
        res.send({"msg":"please Login"})
    }
}

module.exports={
    Authorization
}