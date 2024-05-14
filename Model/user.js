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
    sold:{
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
    }
});

let User = mongoose.model("User", userSchema)
export {User};