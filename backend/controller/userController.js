import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

//register the user
export const registerUser=async(req,res)=>{
    const {username,email,password,role}=req.body
    const hashedPassword= await bcrypt.hash(password,10)
    const user=await User.create({username,email,password:hashedPassword,role})
    res.status(200).json({message:"User is successfully register"})
}

//login the user
export const loginUser=async(req,res)=>{
    const {email, password}=req.body
    const user=await User.findOne({where:{email:email}})
    if(!user){
        return res.status(404).json({message:"User not found of that email"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password)
    if(!passwordCompare){
        res.status(403).json({message:"Password is not valid "})
        return
    }
    const token=jwt.sign({id:user.id}, process.env.SECRET_KEY, {expiresIn:"1h"});
    //res.cookie("token", token);
    res.status(200).json({message:"User is successfully login",data:token})    
}