const express = require("express");
const route = express.Router();

const {signup, login} = require("../controller/Auth");
const {auth,isStudent,isAdmin} = require("../middleware/auth");
route.post("/signup",signup);
route.post("/login",login);

route.get("/test", auth, (req,res)=>{
        res.json({
        success:true,
        message:"Wellcome to protected routes test",
    })
})

route.get("/student", auth, isStudent, (req,res)=>{
   res.json({
        success:true,
        message:"Wellcome to protected routes student",
    })
})

route.get("/admin", auth, isAdmin, (req,res)=>{
         res.json({
         success:true,
         message:"Wellcome to protected routes addmin ",
     })
})
module.exports = route;