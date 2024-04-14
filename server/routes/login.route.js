import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/UserSchema.js"
// import route from "express.Router()"
import { Router } from "express"
const route = Router()
const app=express()


route.post("/",async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(422).json({error:"Please enter the following fields"})
    }
    const UserLogin = await User.findOne({email:email})
    if(UserLogin){
        const isMatch = await bcrypt.compare(password,UserLogin.password)

        const token=await UserLogin.generateAuthToken();
        res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
        })

        if(!isMatch){
            res.status(422).json({error:"Invalid Credentials"})
        }
        else{
            res.status(201).json({message:"User Loginned Successfully"})
        }
    }
})

export default route