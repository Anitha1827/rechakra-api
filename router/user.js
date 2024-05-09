import express from "express"
import bcrypt from "bcrypt"
import { User } from "../Model/user.js";
import { generateJwtToken, gerCurrentDate } from "../store.js";

let  router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    try {
        // find already user Registered
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({ message:"Email already registered" });
        } 

        // generate hashed password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);
        let createdAt = gerCurrentDate()

        // Add user to DB
        let newUser = await new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            phone:req.body.phone,
            createdAt:createdAt,
        }).save();

        // generate jwtToken
        let token = generateJwtToken(newUser._id);
        res.send({message:"Signup Successfully!", token });

    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message});
    }
});

// Login
router.post("/login", async(req, res) =>{
    try {
        // Find user already Registered
        let user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        //validate password
        let validatePassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validatePassword){
            return res.status(400).json({message:"Invalied Password"});
        }

        // generate jwtToken
        let token = generateJwtToken(user._id);
        res.send({message:"Login Successfully", token});

    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
});

// // OTP update
// router.put("/otp", async(req, res) =>{
// try {
//     // Find user is already registered 
//     let user = await User.findOne({email:req.body.email});
//     if(!user){
//         return res.status(400).json({message: "Invalid Credentials"})
//     }

//     // Generate random OTP
//     let otp = String(Math.floor(Math.random() * (9999 - 1000)));
//     let date = gerCurrentDate();
//     await User.findOneAndUpdate(
//         {email: req.body.email},
//         {$set : {otp:{ otp, date }}}
//     );
//     // Creating mail details
//     let mailDate = {
//         email:user.email,
//         subject: "Your One Time Password",
//         message:`Your One Time Password for Auth app is "${otp}", its valied for 24hrs only`,
//     };

//     // Sending email
//     let mail = await MailSender

// } catch (error) {
//     console.log(error)
//     res.status(500).json({error : error.message});
// }
// })


export let authRouter = router