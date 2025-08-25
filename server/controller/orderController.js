import Order from "../model/order.js";
import NFT from "../model/nft.js";

// Create an order
export const createOrder = async (req, res) => {
  try {
    const { nftId } = req.body;
    const buyerId = req.user._id;

    const nft = await NFT.findById(nftId);
    if (!nft) return res.status(404).json({ success: false, message: "NFT not found" });
    if (!nft.isListed) return res.status(400).json({ success: false, message: "NFT not listed" });

    // Transfer ownership
    nft.status = "sold";
    nft.isListed = false;
    await nft.save();

    const order = new Order({
      buyer: buyerId,
      nft: nft._id,
      price: nft.price,
      status: "pending",
      consumed: false,
    });
    await order.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const orders = await Order.find({ buyer: buyerId, status: { $in: ["pending","confirmed"] }, consumed: false })
      .populate("nft")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
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

    if (!allowed.includes(status))
      return res.status(400).json({ success: false, message: "Invalid status" });

    const order = await Order.findById(orderId).populate("nft");
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    order.status = status;

    if (status === "confirmed") {
      const nft = order.nft; // get the NFT from the populated order
      nft.owner = order.buyer; // transfer ownership
      await nft.save();
    }

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
export const getOrdersByCreators = async (req, res) => {
  try {
    const creatorId = req.user._id;

    // Find NFTs created by this user
    const nfts = await NFT.find({ creator: creatorId }).select("_id");
    const nftIds = nfts.map((n) => n._id);

    // Find orders for those NFTs
    const orders = await Order.find({ nft: { $in: nftIds } })
      .populate("nft", "name price status")
      .populate("buyer", "username email")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get orders by creator error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
