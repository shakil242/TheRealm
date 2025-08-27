import express from "express";
import {
  getAllUsers,
  requestvendor,
  updateUserRole,
  updateUserStatus,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin can view all users
router.get("/data", protect, authorizeRoles("admin"), getAllUsers);

// Any logged-in user can request vendor upgrade
router.put("/request-vendor", protect, authorizeRoles("user"), requestvendor);

// Admin updates roles
router.put("/role/:userId", protect, authorizeRoles("admin"), updateUserRole);

// Admin updates user status (ban/unban)
router.put("/status/:userId", protect, authorizeRoles("admin"), updateUserStatus);

export default router;
