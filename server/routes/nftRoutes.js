import express from "express";
import { addNFT, getAllNFTs,getMyNFTs, deleteNFT, upload } from "../controller/addNftController.js";
import { protect } from "../middleware/authMiddleware.js"; // middleware to check logged in user

const router = express.Router();

// Add NFT with image upload
router.post("/", protect, upload.single("image"), addNFT);

// Get NFTs for logged-in user
router.get("/my", protect, getMyNFTs);

//nft for public to buy
router.get("/all", getAllNFTs);

// Delete NFT
router.delete("/:id", protect, deleteNFT);

export default router;
