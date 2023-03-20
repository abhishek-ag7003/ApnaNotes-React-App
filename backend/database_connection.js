const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://abhishek:Abhishek%409346@inotebook.zsujcpk.mongodb.net/iNotebook"

const connectToMongo = async ()=>{
    mongoose.connect(mongoURI, (error)=>{
       try {
        console.log("connected to Mongo Successfully")
       } catch (error) {
        console.log(error)
       }
    })
}

module.exports = connectToMongo;