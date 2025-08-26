import Order from "../model/order.js";
import NFT from "../model/nft.js";

// Create an order
// Example in createOrder controller
export const createOrder = async (req, res) => {
  try {
    const { nftId, } = req.body;
    const buyerId = req.user._id;

    // Fetch the NFT
    const nft = await NFT.findById(nftId);
    if (!nft) 
      return res.status(404).json({ success: false, message: "NFT not found" });

    // Check if NFT is already sold / unavailable
    if (!nft.isListed || nft.status === "sold") {
      return res.status(400).json({ success: false, message: "NFT is not available" });
    }

    // Create the order
    const order = new Order({
      nft: nft._id,
      buyer: buyerId,
      seller: nft.owner, // original owner
      price: nft.price,
      status: "pending", // immediately mark as confirmed
    });

    await order.save();

    // Update NFT ownership immediately
    nft.owner = buyerId;
    nft.status = "sold";
    nft.isListed = false;
    await nft.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const buyerId = req.user._id;

    // Fetch orders where buyer is the current user
    const orders = await Order.find({
      buyer: buyerId,
      consumed: false,
      status: { $in: ["pending", "confirmed"] },
    })
      .populate({
        path: "nft",
        match: { owner: buyerId }, // only NFTs currently owned by this user
      })
      .sort({ createdAt: -1 });

    // Filter out orders where nft population failed (e.g., NFT not owned anymore)
    const filteredOrders = orders.filter(o => o.nft !== null);

    res.status(200).json({ success: true, orders: filteredOrders });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "canceled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Only update the order status; do NOT change NFT ownership
    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "username email")
      .populate("nft", "name price creator")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ success: false, message: "Server error. Could not fetch orders." });
  }
};
// Get orders by NFT creator (for sales dashboard)
export const getOrdersByOwner = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const orders = await Order.find({
      seller: ownerId,
      status: { $in: ["pending", "confirmed"] },
    })
      .populate("nft", "name price status")
      .populate("buyer", "username email")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get orders by owner error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


