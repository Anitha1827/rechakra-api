import express from "express";
import bcrypt from "bcrypt";
import { User } from "../Model/user.js";
import { decodeJwtToken, generateJwtToken, gerCurrentDate } from "../store.js";
import { MailSender } from "../mailer.js";

let router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    // find already user Registered
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // generate hashed password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    let createdAt = gerCurrentDate();

    // Add user to DB
    let newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      createdAt: createdAt,
      usertype: req.body.usertype,
    }).save();

    // generate jwtToken
    let token = generateJwtToken(newUser._id);
    let isAdmin = false;
    if (newUser.email === "admin@email.com") {
      isAdmin = true;
    }
    res.send({ message: "Signup Successfully!", token, isAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Find user already Registered
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //validate password
    let validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "Invalied Password" });
    }

    // generate jwtToken
    let token = generateJwtToken(user._id);
    let isAdmin = false;
    let admin = process.env.admin;
    if (user.email === admin) {
      isAdmin = true;
    }
    res.status(200).json({ message: "Login Successfully", token, isAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Reset Password
router.put("/reset-password", async (req, res) => {
  try {
    // find user is available in this mail id
    let email = req.body.email;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // Generate hash password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    //  generate jwt token
    let token = generateJwtToken(user._id);
    res.status(200).json({ message: "Password Reset Successfully!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// OTP update
router.post("/set-otp", async(req, res) => {
    try {
        // Find user already registered
        let user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({message:"Invalied Credentials!"})
        }

        // Generate OTP random
        let otp = String(Math.floor(Math.random() * (9999 - 1000)));
        let date = gerCurrentDate();
        await User.findOneAndUpdate(
            {email: req.body.email},
            {$set:{
                otp:{opt, date}
            }}
        );
        // Creating email details
        let mailData = {
            email: user.email,
            subject: "Your One Time Password",
            message:`Your One Time Password for Rechakra App is "${otp}", its valid for 24hrs only`,
        };
        // Sending mail
        let mail = await MailSender({data:mailData})
        let msg = mail ? "Mail sent" : "Error sending mail";

        res.send({message:msg, otp});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});


// Upadate user Datails
router.put("/update-user-details", async (req, res) => {
  try {
    let token = req.headers["x-auth"];
    let userId = decodeJwtToken(token);

    // update user data
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
        },
      }
    );
    res.status(200).json({message:"User data updated successfully!"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete user data
router.delete("/delete-user", async(req, res) => {
    try {
        let token = req.headers['x-auth']
        let userId = decodeJwtToken(token)
        await User.findByIdAndDelete({_id:userId});
        res.status(200).json({message:"User deleted Successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
})

export let authRouter = router;
