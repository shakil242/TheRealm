import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected
router.get("/me", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
