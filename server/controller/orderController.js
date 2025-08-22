import Order from "../model/order.js";
import NFT from "../model/nft.js";



export const createOrder=async(req,res)=>{
    try{

        let {nftId,quantity}=req.body
        let buyerId=req.user._id

        let nft =await NFT.findById(nftId)

        if(!nft){
            return res.status(404).json({success:false,message:"NFT not found"})
        }
        if(nft.stock<quantity){
            return res.status(400).json({
                succes:false,
                message:`Not enough stock for ${nft.name}`
            })
        }
        //deduct stock
        nft.stock-=quantity
        if(nft.stock===0)nft.status="sold"
        await nft.save()
        let totalPrice=nft.price*quantity
        
        let order=new Order({
            buyer:buyerId,
            nft:nft._id,
            quantity,
            price:nft.price,
            totalPrice,

        })
        await order.save()
            res.status(201).json({ success: true, message: "Order placed successfully", order });

    }catch(error){
        res.status(500).json({ success: false, message: error.message });

    }
}
export const getUserOrders=async(req,res)=>{
    try{
        let buyerId=req.user._id
        let orders=await Order.find({buyer:buyerId})
        .populate("nft")
        .sort({createdAt:-1})
        res.status(200).json({ success: true, orders });

    }catch(error){
        res.status(500).json({ success: false, message: error.message });

    }
}
export const getOrdersByCreators=async(req,res)=>{
    try{

        let  {userId}=req.params

        let nfts=await NFT.find({creator:userId})
        .select("_id")
        let nftIds=nfts.map(nft=>nft._id)

        let orders=await Order.find({nft:{$in:nftIds}})
        .populate("nft","name price status")
        .populate("buyer","username email")
        res.json({ success: true, orders });
    }catch(error){
           console.error(error);
    res.status(500).json({ success: false, message: "Server error" });

    }
}
export const getAllOrders=async(req,res)=>{
    try{

        let orders=await Order.find()
        .populate("buyer","username email")
        .populate("nft","name price creator")
          return res.status(200).json({
         success: true,
         orders,
         });
    }catch(error){
        console.error("Error fetching all orders:", error);
    return res.status(500).json({
      success: false,
      error: "Server error. Could not fetch orders.",
    });
        
    }
}