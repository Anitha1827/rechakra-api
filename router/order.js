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
            sold:req.body.sold,
            price:req.body.price,
            quantity:req.body.quantity
        }).save();
        res.status(200).json({message:"New Orders Added to the DB Successfully!"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

// Updating the Orders details
router.put("/update-order", async(req, res) => {
    try {
        let userId = req.body.userId;
        let productId = req.body.productId;
        let pickUpAddress = req.body.pickUpAddress;
        let dropAddress = req.body.dropAddress;
        let pickDate = req.body.pickDate;
        let sold = req.body.sold;
        let price = req.body.price;
        let quantity = req.body.quantity;

        let order = await Orders.findOneAndUpdate({
            $set : {
                userId,
                productId,
                pickUpAddress,
                dropAddress,
                pickDate,
                sold,
                price,
                quantity
            }
        });
        res.status(200).json({message:"Order Details Updated Successfully!"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

// Delete orders
router.delete("/delete/:id", async(req, res) => {
    try {
        let id = req.params.id;
        let deleteOrder = await Orders.findOneAndDelete({_id:id});
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
        let getByUserId = await Orders.find({usersId:usersId});
        res.status(200).json({message:"Order Fetched by userId successfully!", getByUserId});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
})

export let Order = router;