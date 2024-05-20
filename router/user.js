import express from "express";
import { Product } from "../Model/product";
import { Orders } from "../Model/orders";

let router = express.Router();

// Post cart (product)
router.post("/add-new", async(req, res) => {
    try {
        await Product({
            title,description,price,review,count,discount,quantity : req.body
        }).save();
        res.status(200).json({message:"Added to cart successfully!"});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
});

// Get cart (product details)
router.get("/get-cart", async(req, res) => {
    try {
        let getCartDetails = await Product.find()
        res.status(200).json({message:"Fetched Cart Details Succefully!", getCartDetails});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

// Update Cart
router.put("/update-cart:/id", async(res, res) =>{
    try {
        let count = req.body.count;
        let quantity = req.body.quantity;
        let id = req.params.id;

        await Product.findOneAndUpdate(
            {_id:id},
            {$set:{
                count,quantity
            }}
        );
        res.status(200).json({message:"Cart Updated Successfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

// delete cart
router.delete("/delete:/id", async(req, res) => {
    try {
        let id = req.params.id;
        await Product.findOneAndDelete({_id:id});
        res.status(200).json({message:"Cart Deleted Successfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

//get user history
router.get("/get-history", async(req, res) => {
    try {
        let userId = req.params.id;
        let userHistory = await Orders.find({userId});
        res.status(200).json({message:"user History fetched successfully!", userHistory});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

// get Seller History
router.get("/get-seller-history", async(req, res) => {
    try {
        let sellerId = req.params.id;
        let sellerHistory = await Orders.find({sellerId});
        res.status(200).json({message:"Seller History Fetched Successfully!", sellerHistory});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
}) ;



export let NormalUser = router;