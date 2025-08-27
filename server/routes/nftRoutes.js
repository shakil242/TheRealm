import express from "express";
import {
  addNFT,
  getAllNFTs,
  getMyNFTs,
  deleteNFT,
  upload,
  updateNFTStatus,
  getNFTById,
  updateNFT,
  resellNFT,
} from "../controller/NftController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authMiddleware.js"; // create roleMiddleware.js

const router = express.Router();

// Vendor can create NFT
router.post("/", protect, authorizeRoles("vendor"), upload.single("image"), addNFT);

// Vendor can update their NFT
router.put(
  "/update-nft/:id",
  protect,
  authorizeRoles("vendor"),
  upload.single("image"),
  updateNFT
);

// Get NFTs of logged-in vendor
router.get("/my", protect, authorizeRoles("vendor"), getMyNFTs);

// Public routes
router.get("/all" ,getAllNFTs);
router.get("/:id", getNFTById);

// Vendor can delete
router.delete("/:id", protect, authorizeRoles("vendor"), deleteNFT);

//Admin can update status
router.put("/:id/status", protect, authorizeRoles("admin"), updateNFTStatus);

// User can resell their NFT
router.put("/:id/resell", protect, authorizeRoles("user", "vendor"), resellNFT);

export default router;
