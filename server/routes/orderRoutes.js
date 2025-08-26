// routes/orderRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder, getAllOrders, getOrdersByOwner, getUserOrders, updateOrderStatus } from "../controller/orderController.js";


const router = express.Router();

router.post("/order-placed", protect,createOrder);
router.get("/my-orders", protect, getUserOrders);
router.get("/creator", protect, getOrdersByOwner);
router.get("/all-orders", getAllOrders);
router.put("/:orderId/status", protect, updateOrderStatus);

export default router;
