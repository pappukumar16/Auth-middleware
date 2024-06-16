const express = require("express");
require("dotenv").config();
const app = express();
 const port = process.env.PORT || 4000;
app.use(express.json());

//db connection
require("./config/database").connect();

// middleware 
const user = require("./routes/user");
app.use("/api/v1/",user);

//conform port no 
app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})

app.use((req,res)=>{
    res.send(`<h1>Hello ji Rahul ji </h1>`)
})