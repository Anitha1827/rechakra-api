import mongoose from "mongoose";

let orderSchema = new mongoose.Schema({
userId:{
    type:"string",
},
productId:{
    type:"string",
},
pickUpAddress:{
    type:"string",
},
dropAddress:{
    type:"string",
},
pickDate:{
    type:"string",
},
sold:{
    type:"boolean"
},
price:{
    type:"string",
},
quantity:{
    type:"string",
},
});

let Orders = mongoose.model("Orders", orderSchema);
export {Orders}