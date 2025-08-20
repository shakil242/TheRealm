import express from "express";
import { getAllUsers } from "../controller/userController.js";
import { updateUserRole } from "../controller/userController.js";
import { updateUserStatus } from "../controller/userController.js";
const router = express.Router();

// GET all users (includes moderators)
router.get("/data", getAllUsers);
router.put("/role/:userId", updateUserRole);
router.put("/status/:userId", updateUserStatus);

export default router;
