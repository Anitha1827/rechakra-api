import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import { dbConnection } from "./db.js";
import { authRouter } from "./router/user.js";

// config dotenv
dotenv.config();

// middleware
let app = express();
app.use(express.json());
app.use(cors());

// DB Connection
dbConnection();

//Test API
app.get("/", (req, res) => {
    res.send({
        message:"ReChakra application running successfully!",
    })
})

// API route
app.use("api/auth", authRouter)

// initilization port
let PORT = process.env.PORT;

// Server connection
app.listen(PORT, console.log(`Server Running on PORT ${PORT}`));

