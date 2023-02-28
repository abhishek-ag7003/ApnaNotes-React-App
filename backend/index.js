const connectToMongo = require("./database_connection")

connectToMongo();

const express = require('express')
const app = express();
const port = 3000;

// app.get("/",(req,res)=>{
//     res.send("Hello")
// })
app.use(express.json())

//Available routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})