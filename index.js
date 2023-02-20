const express = require("express")
const {connection} = require("../Backend/mongoose/db")
const cors = require("cors")
const {userRouter} = require("../Backend/Users/users.routes")
const {Authorization} = require("../Backend/middleware/auth.middleware")
const { PostRouter } = require("./Users/post.routes")

const app = express();
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(Authorization)
app.use("/posts",PostRouter)


app.listen(6000, async(req,res)=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running at 6000")
})