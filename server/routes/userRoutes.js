import express from "express";
import { getAllUsers, requestvendor } from "../controller/userController.js";
import { updateUserRole } from "../controller/userController.js";
import { updateUserStatus } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// GET all users (includes vendors)
router.get("/data", getAllUsers);
router.put("/request-vendor", protect, requestvendor);
router.put("/role/:userId", updateUserRole);
router.put("/status/:userId", updateUserStatus);


export default router;
