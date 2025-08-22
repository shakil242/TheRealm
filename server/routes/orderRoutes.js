// routes/orderRoutes.js
import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { createOrder, getAllOrders, getOrdersByCreators, getUserOrders } from "../controller/orderController.js";


const router = express.Router();

// Create a new order (protected route)
router.post("/order-placed",protect ,createOrder);
router.get("/my-orders", protect, getUserOrders);
router.get("/creator/:userId", getOrdersByCreators);
router.get("/all-orders",getAllOrders)


export default router;
