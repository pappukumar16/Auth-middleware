const mongoose = require("mongoose");
require("dotenv").config();

exports.connect =  ()=>{
  const port = process.env.base_URL;
    
  mongoose.connect(port, {})

    .then( ()=> {console.log("Db connect successfuly")})
    .catch( (err)=> {
        console.log("db connection issu")
        console.log(err);
    })

}