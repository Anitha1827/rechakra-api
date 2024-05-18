import express from "express";
import { getCurrentDate } from "../store.js";
import { Seller } from "../Model/seller.js";

let router = express.Router();

// creating new seller details
router.post("/new-seller", async(req, res) => {
    try {
        let createdAt = getCurrentDate();
        await new Seller({
            // Add new Seller to DB
            name : req.body.name,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            address:req.body.address,
            createdAt:createdAt,
            updatedAt:createdAt,
            sold:req.body.sold,
            otp:req.body.otp
        }).save();
        res.status(200).json({error:error.message})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

// Deleting seller details
router.delete("/delete/:id", async(res, res) => {
    try {
        let id = req.params.id;
        let deteleSeller = await Seller.findOneAndDelete({_id:id});
        res.status(200).json({message:"Seller details deleted Successfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

// Get seller details
router.get("get-seller", async(req, res) => {
    try {
        let sellerId = req.params.id;
        let getSeller = await Seller.find({_id:sellerId});
        res.status(200).json({message:"Seller details fetched successfully!", getSeller});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
})

export let Seller = router