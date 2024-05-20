import express from "express";
import { Seller } from "../Model/seller";
import { Product } from "../Model/product";

let router = express.Router();

// Get Seller Details
router.get("/get", async(req, res) => {
    try {
        let id = req.params.id;
        let sellerdetails = await Seller.find({_id:id});
        res.status(200).json({message:"Seller Details fetched Succesfully",sellerdetails});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
});

// Get Sold data
router.get("/get-sold", async(req, res) => {
    try {
        let sellerId = req.params.id;
        let sellerdetails = await Product.find({sellerId});
        res.status(200).json({message:"Sellers sold data fetched successfully!", sellerdetails});
    } catch (error) {
        console.log(error)
        res.status(200).json({error:error.message})
    }
})

export let SellerRouter = router;