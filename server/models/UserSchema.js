
import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();

// Assuming 'single' and 'prog' are defined elsewhere as valid schemas
// For demonstration, I'll define them here

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    cpassword:{
        type:String,
        required:true,
        unique:true,
    },
    user: {
        type: [[[String]]], // Assuming you want an array of 'single' objects
        required: true
    },
    model: {
        type: [[[String]]], /// Assuming you want an array of 'single' objects
        required: true
    },
    progress: {
        type: [[Number]], // Assuming you want an array of 'prog' objects
        required: true
    },
    weekNo:{
        type:Number,
        // required: true
    },
    tokens: [{
            token:{
                type: String,
                required:true
            } 
    }]
}, { timestamps: true });

UserSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12)
        this.cpassword=await bcrypt.hash(this.cpassword,12)
    }
    next();
})

//We are generating Token
UserSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRETKEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model("USER", UserSchema);

export default User;

/**
 * 
 * Problems to show
 * 
 * 1. the 3d array becomes - 2d Array
 */