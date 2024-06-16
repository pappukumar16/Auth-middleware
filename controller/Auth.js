const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");
require("dotenv").config();


exports.signup = async(req,res)=>{
    try {

        // fetch data
        const {name,email,password,role} = req.body;

        // check user existig or not 
        const existigUser = await User.findOne({email});

        if(existigUser){
            return res.status(400).json({
              success:false,
              message:"User all ready exist",
            })
        }

        // hash the password 
         
        let hashPassword ;
        try {

            hashPassword = await bcrypt.hash( password,10);

            
        } catch (error) {
            console.log(`Hassing password error ${error}`)
           return res.status(500).json({
                success:false,
                message:error.message,
            })
        }

        // db entry 
        const user = await User.create({
            name,email,password:hashPassword,role
        });

        console.log("User data => ",user)
         
        // user status
       return res.status(200).json({
           success:true,
            message:"User create successfully",
        });
        
    } catch (error) {
        return res.status(401).json({
            success:400,
            message:"User Not create",
        });
    }
}










//login
exports.login = async(req,res) => {
    try {

        //data fetch
        const {email, password} = req.body;
        //validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }

        //check for registered user
        let user = await User.findOne({email});
        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        //verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password) ) {
            //password match
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                }
             );

                                

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }

            res.cookie("BalmikiCoocki", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });

    }
}