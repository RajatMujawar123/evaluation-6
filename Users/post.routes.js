const express = require("express")
const {PostModel} = require('../model/post.model')
const PostRouter = express.Router()

PostRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try {
        const post = new PostModel(payload)
        await post.save()
        res.send({"msg":"Post Created"})
    } catch (error) {
        res.send({"msg":error})
    }
})

PostRouter.get("/",async(req,res)=>{
    try {
        const data = await PostModel.find();
        res.send(data)
    } catch (error) {
        res.send({"msg":error})
    }
})

PostRouter.delete("/delete/:id", async(req,res)=>{
   try {
    const postId = req.params.id
    await PostModel.findByIdAndDelete({_id:postId})
    res.send({"msg":`post has been deleted with  ID ${postId}`})
   } catch (error) {
    res.send({"msg":error})
   }
})

module.exports={
    PostRouter
}