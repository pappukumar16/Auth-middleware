const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name:{
          type:String,
          require:true,
          trim:true,
        },

        password:{
          type:String,
          require:true,
        },

        email:{
          type:String,
          require:true,
        },
         
        description:{
           type:String,
           
        },

        role:{
        type:String,
        enum:["Admin","Student","Visitor"],
        required:true
        }

    }
    ,{timestamps:true});

    module.exports = mongoose.model("User",UserSchema);