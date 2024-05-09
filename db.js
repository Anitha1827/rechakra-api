import mongoose from "mongoose";
import dotenv from "dotenv"

// config dotenv
dotenv.config();

export function dbConnection(){
    let mongo_url = process.env.mongoURL
    try {
        mongoose.connect(mongo_url);
        console.log("Database connected Successfully!")
    } catch (error) {
        console.log(error.message)
    }

}