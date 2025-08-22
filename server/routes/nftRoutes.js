import express from "express";
import { addNFT, getAllNFTs,getMyNFTs, deleteNFT, upload, updateNFTStatus, getNFTById } from "../controller/NftController.js";
import { protect } from "../middleware/authMiddleware.js"; // middleware to check logged in user

const router = express.Router();

// Add NFT with image upload
router.post("/", protect, upload.single("image"), addNFT);

// Get NFTs for logged-in user
router.get("/my", protect, getMyNFTs);


//nft for public to buy
router.get("/all", getAllNFTs);
router.get("/:id", getNFTById);

// Delete NFT
router.delete("/:id", protect, deleteNFT);
router.put("/:id/status",updateNFTStatus)

export default router;
