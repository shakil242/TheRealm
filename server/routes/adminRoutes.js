import express from "express";
import { registerAdmin, loginAdmin, getUser } from "../controller/adminAuthController.js";
import { protect,  } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", protect,  getUser); // protected & admin only

export default router;
