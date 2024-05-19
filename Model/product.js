import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
  title: {
    type:"string",
  },
  description:{
    type:"string",
  },
  price:{
    type:"string",
  },
  review:{
    type:"array",
    default:[],
  },
  count:{
    type:"string",
  },
  pickUpAddress:{
    type:"string"
  },
  discount:{
    type:"string"
  },
  sellerId:{
    type:"string",
  }
});

let Product = mongoose.model("Product", productSchema);
export { Product };
