import authModel from './../models/authModel.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthController{


    static userRegistration = async (req,res)=>{
        const {username,email,password} = req.body;
        try{
            if(username && email && password){
                const isUser = await authModel.findOne({email:email});
                if(!isUser){
                    //password hashing
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashPassword = await bcryptjs.hash(password,genSalt);

                    //save a user
                    const newUser =  new authModel({
                        username:username,
                        email,
                        password :hashPassword,
                    });
                    const savedUser = await newUser.save();
                    if(savedUser){
                     return   res.status(200).json({message:"User Registered Successfully"});
                    }
                }else{
            return res.status(400).json({ message: "Email Already Exists" });
                }
            }else{
            return res.status(400).json({ message: "All fields are required" });
            }
        }catch(err){
            return res.status(400).json({message:err.message});
        }
    }


    static userLogin = async(req,res)=>{
        const {email , password} = req.body;
        try{
            if(email && password){
                const isEmail = await authModel.findOne({email:email});
                if(isEmail){
                    if(isEmail.email === email &&  ( bcryptjs.compareSync(password,isEmail.password))){
                        //generate token  here we will provide token to user so that he can access other routes
                        const token = jwt.sign({userID : isEmail._id}, "tokenkdjfakjdkfak" ,{expiresIn:"2d"
                    })
                    return res.status(200).json({
                        message:"Login Successfully",
                        token,
                        name: isEmail.username
                    })
                    }else{
            return res.status(400).json({ message: "Wrong Credentials" });
                    }
                }else{
            return res.status(400).json({ message: "Email id not found" });
                }
            }else{
            return res.status(400).json({ message: "All fields are required"});
            }

        }catch(err){
            return res.status(400).json({ message: err.message });

        }
    }


}


export default AuthController;