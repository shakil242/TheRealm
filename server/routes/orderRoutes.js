import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getOrdersByOwner,
  getUserOrders,
  updateOrderStatus,
} from "../controller/orderController.js";
import { authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// User places an order
router.post("/order-placed", protect, authorizeRoles("user","vendor"), createOrder);

// User sees their own orders
router.get("/my-orders", protect, authorizeRoles("user","vendor"), getUserOrders);

// Vendor sees orders for their NFTs
router.get("/creator", protect, authorizeRoles("vendor"), getOrdersByOwner);

// Admin sees all orders
router.get("/all-orders", protect, authorizeRoles("admin"), getAllOrders);

// Vendor/Admin can update order status
router.put("/:orderId/status", protect, authorizeRoles("vendor"), updateOrderStatus);

export default router;
