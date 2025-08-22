import { error } from "console";
import NFT from "../model/nft.js";
import multer from "multer";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

export const upload = multer({ storage });

// @desc    Add a new NFT
// @route   POST /api/nfts
// @access  Private
export const addNFT = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image file is required" });
    }

    const nft = new NFT({
      name,
      description,
      price: Number(price),
      image: req.file.filename,
      creator: req.user.id,
      status: "pending", // default pending
      stock: stock ? Number(stock) : 1, // use stock if provided, else 1
    });

    await nft.save();
    res.status(201).json({ success: true, nft });
  } catch (err) {
    console.error("Add NFT error:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get NFTs for current user
// @route   GET /api/nfts/my
// @access  Private
export const getMyNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find({ creator: req.user.id })
    .sort({ createdAt: -1 })
    
    .select("name description price image status stock category createdAt updatedAt")
    res.json({ success: true, nfts });
  } catch (err) {
    console.error("Get My NFTs error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
// get all user nfts to display on shop
export const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find()

    .sort({ createdAt: -1 })
    .populate("creator", "role username")
    .select("name description price image status stock  category creator createdAt updatedAt");
     // latest first
    res.json({ success: true, nfts });
  } catch (err) {
    console.error("Get All NFTs error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


// Get NFT by ID
export const getNFTById = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);
    if (!nft) {
      return res.status(404).json({ success: false, error: "NFT not found" });
    }
    res.json({ success: true, nft });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};


// @desc    Delete NFT by ID
// @route   DELETE /api/nfts/:id
// @access  Private
export const deleteNFT = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);
    if (!nft) return res.status(404).json({ success: false, error: "NFT not found" });

    if (nft.creator.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    await nft.deleteOne();
    res.json({ success: true, message: "NFT deleted successfully" });
  } catch (err) {
    console.error("Delete NFT error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
export const updateNFTStatus=async(req,res)=>{
  try{
    let {status}=req.body
      let { id } = req.params
    if(!["pending","available","sold"].includes(status)){
      return res.status(400).json({success:false,error:"invalid status valus"})
    }
    let nft=await NFT.findById(id)
    if(!nft){
      return res.status(404).json({success:false,error:"NFTnot found"})
    }
    nft.status=status
    await nft.save()
    res.json({ success: true, message: "NFT status updated successfully", nft });

  }catch(error){
    console.error("Update NFT status error:", error);
    res.status(500).json({ success: false, error: "Server error" });

  }

}