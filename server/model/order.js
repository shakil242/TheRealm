import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    nft:{
        type:mongoose.Schema.ObjectId,
        ref:"NFT",
        required:true
    },
    quantity:{
        type:Number,
        default:1,
        min:1,
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed","canceled"],
        default:"pending"
    },

},
{timestamps:true}
)
const Order=mongoose.model("Order",orderSchema)
export default Order