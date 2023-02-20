const express = require("express");
const {UserModel} = require('../model/user.model');
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//Register------
userRouter.post("/register", async(req,res)=>{
    const {name,age,email,password,gender,city} = req.body
    try {
        bcrypt.hash(password, 5,async(err,hash)=>{
            if(err){
                res.send({"msg":"something went wrong", "error":err})
            }else{
                const user = new UserModel({name,email,age,gender,city,password:hash})
                await user.save()
                res.send({"msg":"User has been registerd"})
            }
        })
       
    } catch (error) {
        res.send({"msg":"something went wrong", "error":error})
    }
})


//Login--------
userRouter.post("/login", async(req,res)=>{
    const {email,password} = (req.body)
    try {
        const user = await UserModel.find({email})
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, (err,result)=>{
                if(result){
                    const token =jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Logged in", "token":token})
                }
                else{
                    res.send({"msg":"something went wrong", "error":err})
                }
            })
        }
        res.send(user)
    } catch (error) {
        res.send({"msg":"something went wrong", "error":error})
    }
})


module.exports={
    userRouter
}