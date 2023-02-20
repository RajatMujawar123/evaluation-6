const mongoose  = require("mongoose")

const connection = mongoose.connect("mongodb+srv://rajat:rajat@cluster0.rnkwwxb.mongodb.net/linkedApp?retryWrites=true&w=majority")

module.exports={
    connection
}