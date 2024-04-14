import express, { application } from 'express'
const route=express.Router()
import User from "../models/UserSchema.js"

route.post("/",async(req,res)=>{
    const {name,email,password,cpassword}=req.body;
    console.log(req.body)
    if(!name || !email || !password || !cpassword){
        res.status(422).json({error:"Please fill the following credentials"})
    }
    try{
        const UserExist=await User.findOne({email:email})
        if(UserExist){
            res.status(422).send("User already exists")
        }
        else if(password!=cpassword){
            res.status(422).send("Passwords are not same")
        }
        else{
            const user=new User({name,email,password,cpassword})

            await user.save()
            console.log("User Regisitered Successfully")
            res.send("User Regisitered Successfully")
        }
    }
    catch(err){
        res.status(422).json({error:`The error is ${err}`})
        console.log("The error",err)
    }
})

export default route