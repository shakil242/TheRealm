// models/order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 Add this
    nft: { type: mongoose.Schema.Types.ObjectId, ref: "NFT", required: true },
    quantity: { type: Number, default: 1, max: 1 },
    price: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },

    consumed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
