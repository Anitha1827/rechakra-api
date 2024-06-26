import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    name:{
        type:"string",
        required:true,
    },
    email:{
        type:"string",
        required:true,
    },
    password:{
        type:"string",
        required:true,
    },
    phone:{
        type:"number",
        required:true,
    },
    address:{
        type:"string",
    },
    history:{
        type:"array",
        default:[],
    },
    createdAt:{
    type:"string",
    },
    updatedAt:{
        type:"string"
    },
    usertype:{
        type:"string"
    },
    otp:{
        type:"object"
    },
    cart:{
        type:"array",
        default:[]
    }
});

let User = mongoose.model("User", userSchema)
export {User};