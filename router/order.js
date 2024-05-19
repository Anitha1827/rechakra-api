import express from "express";
import { Orders } from "../Model/orders";

let router = express.Router();

// New Order
router.post("/new-order", async(req, res) => {
    try {
        await new Orders({
            // Add New Orders to DB
            userId:req.body.userId,
            productId:req.body.productId,
            pickUpAddress:req.body.pickUpAddress,
            dropAddress:req.body.dropAddress,
            pickDate:req.body.pickDate,
            price:req.body.price,
            quantity:req.body.quantity,
            sellerId:req.body.sellerId
        }).save();
        // need to send mail to dealer with order details (nodmailer)
        
        res.status(200).json({message:"Your Orders completed Successfully!"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

// // Updating the Orders details
router.put("/update-order", async(req, res) => {
    try {
        let {id} = req.body;

         await Orders.findOneAndUpdate(
            {_id:id},
            {$set : {
                sold:true,
            }}
        );
        res.status(200).json({message:"Order Details Updated Successfully!"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

// Delete orders
router.delete("/delete/:id", async(req, res) => {
    try {
        let id = req.params.id;
         await Orders.findOneAndDelete({_id:id});
        res.status(200).json({message:"Order details deleted succesfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

// get Orders by users
router.get("/get-by-userId", async(req, res) => {
    try {
        let usersId = req.params.userId;
        let getByUserId = await Orders.find({usersId});
        res.status(200).json({message:"Order Fetched by userId successfully!", getByUserId});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

// get Orders by seller id
router.get("/get-order-by-sellerId", async(req, res) => {
    try {
        let sellerId = req.params.sellerId;
        let getBySellerId = await Orders.find({sellerId});
        res.status(200).json({message:"Order Fetched by userId successfully!", getBySellerId});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

export let Order = router;