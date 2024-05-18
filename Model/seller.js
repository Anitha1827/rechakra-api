import mongoose from "mongoose";

let sellerSchema = new mongoose.Schema({
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
    createdAt:{
    type:"string",
    },
    updatedAt:{
        type:"string"
    },
   sold:{
    type:"array",
    default:[]
   },
   otp:{
    type:"object"
}
});

let Seller = mongoose.model("Sellers", sellerSchema)
export {Seller};