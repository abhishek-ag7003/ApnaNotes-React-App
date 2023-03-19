const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://abhishek:Abhishek%409346@inotebook.zsujcpk.mongodb.net/test"

const connectToMongo = async ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to Mongo Successfully")
    })
}

module.exports = connectToMongo;