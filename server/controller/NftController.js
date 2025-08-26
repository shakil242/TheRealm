import NFT from "../model/nft.js";
import multer from "multer";
import path from "path";
import Order from "../model/order.js";
import mongoose from "mongoose";

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

export const upload = multer({ storage });

// Add a new NFT
export const addNFT = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!req.file) return res.status(400).json({ success: false, error: "Image file is required" });

    const nft = new NFT({
      name,
      description,
      price: Number(price),
      image: req.file.filename,
      creator: req.user.id,
      owner: req.user.id,
      status: "pending", // default pending
      isListed: false,
    });

    await nft.save();
    res.status(201).json({ success: true, nft });
  } catch (err) {
    console.error("Add NFT error:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get NFTs owned or created by current user
export const getMyNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find({owner: req.user.id })
      .sort({ createdAt: -1 })
      .select("name description price image status category createdAt updatedAt isListed");

    res.json({ success: true, nfts });
  } catch (err) {
    console.error("Get My NFTs error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Get all NFTs (for shop)
export const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find()
      .sort({ createdAt: -1 })
      .populate("creator", "role username")
      .select("name description price image status category creator createdAt updatedAt isListed");

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
    if (!nft) return res.status(404).json({ success: false, error: "NFT not found" });
    res.json({ success: true, nft });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Delete NFT
export const deleteNFT = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);
    if (!nft) return res.status(404).json({ success: false, error: "NFT not found" });

    if (String(nft.owner) !== String(req.user.id)) {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    await nft.deleteOne();
    res.json({ success: true, message: "NFT deleted successfully" });
  } catch (err) {
    console.error("Delete NFT error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update NFT status
export const updateNFTStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["pending", "available", "sold"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value" });
    }

    const nft = await NFT.findById(id);
    if (!nft) return res.status(404).json({ success: false, error: "NFT not found" });

    nft.status = status;

    // ✅ If status is available, mark it as listed
    nft.isListed = status === "available";

    await nft.save();

    res.json({ success: true, message: "NFT status updated successfully", nft });
  } catch (error) {
    console.error("Update NFT status error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


// Resell NFT




export const resellNFT = async (req, res) => {
  try {
    const sellerId = req.user?._id; // current owner
    if (!sellerId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const nftId = req.body.nftId || req.params.nftId;
    const { price } = req.body;

    if (!mongoose.Types.ObjectId.isValid(nftId)) {
      return res.status(400).json({ success: false, message: "Invalid NFT ID" });
    }

    // Find the NFT
    const nft = await NFT.findById(nftId);
    if (!nft) return res.status(404).json({ success: false, message: "NFT not found" });

    // Make sure current user actually owns it
    if (!nft.owner.equals(sellerId)) {
      return res.status(400).json({ success: false, message: "You do not own this NFT" });
    }

    // Update NFT to be listed for resale
    nft.price = price;        // set new resale price
    nft.status = "pending"; // available for purchase
    nft.isListed = true;      // show in marketplace
    await nft.save();

    // No new order is created, ownership stays with the seller
    res.json({
      success: true,
      message: "NFT listed for resale in the marketplace",
      nft,
    });
  } catch (err) {
    console.error("Resell NFT error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Update an existing NFT
export const updateNFT = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const nft = await NFT.findById(id);
    if (!nft) return res.status(404).json({ success: false, message: "NFT not found" });

    // Only creator/owner can edit
    if (String(nft.owner) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Update fields if provided
    if (name) nft.name = name;
    if (description) nft.description = description;
    if (price !== undefined) nft.price = Number(price);
    if (category) nft.category = category;

    // If new image uploaded via multer
    if (req.file) {
      nft.image = req.file.filename;
    }

    await nft.save();
    res.status(200).json({ success: true, message: "NFT updated successfully", nft });
  } catch (error) {
    console.error("Update NFT error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
