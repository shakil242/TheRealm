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
    const { name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image file is required" });
    }

    const nft = new NFT({
      name,
      description,
      price: Number(price),
      image: req.file.filename,
      creator: req.user.id, // associate NFT with logged-in user
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
    const nfts = await NFT.find({ creator: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, nfts });
  } catch (err) {
    console.error("Get My NFTs error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
// get all user nfts to display on shop
export const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find().sort({ createdAt: -1 }); // latest first
    res.json({ success: true, nfts });
  } catch (err) {
    console.error("Get All NFTs error:", err);
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
