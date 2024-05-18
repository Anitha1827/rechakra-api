import express from "express";
import { Product } from "../Model/product.js";

let router = express.Router();

// Post new Product
router.post("/new-product", async (req, res) => {
  try {
    // Add New Product to DB
    await new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      review: req.body.review,
      count: req.body.count,
      pickUpAddress: req.body.pickUpAddress,
      discount: req.body.discount,
    }).save();
    res.status(200).json({ message: "Product Added Successfully!" });
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});

// Update Products
router.put("/update:/id", async (req, res) => {
  try {
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let review = req.body.review;
    let count = req.body.count;
    let pickUpAddress = req.body.pickUpAddress;
    let discount = req.body.discount;
    let id = req.params.id;

    let product = await Product.findOneAndUpdate(
      { _id:id },
      {
        $set: {
          title: title,
          description: description,
          price: price,
          review: review,
          count: count,
          pickUpAddress: pickUpAddress,
          discount: discount,
        },
      }
    );
    res.status(200).json({ message: "Product Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete Product
router.delete("/delete:/id", async (req, res) => {
  try {
    let id = req.params.id
    let deleteProduct = await Product.findOneAndDelete({
      _id:id,
    });
    res.status(200).json({ error: error.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Product Details Deleted Successfully!" });
  }
});

// Get All Product
router.get("/get-all", async(req, res) => {
    try {
        let getAllProduct = await Product.find();
        res.status(200).json({message:"Fetched all Product Details Successfully!", getAllProduct});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
});

// Get Product by id
router.get("/get-by-id", async(req,res) => {
    try {
        let id = req.params.id;
        let product = await Product.find({_id:id});
        res.status(200).json({message:"Product fetched by Id Successfully!", product});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
})
export let product = router;
