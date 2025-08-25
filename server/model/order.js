// models/order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    nft: { type: mongoose.Schema.Types.ObjectId, ref: "NFT", required: true },
    quantity: { type: Number, default: 1, max: 1 },
    price: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },

    // When user resells one unit, mark a matching order as consumed
    consumed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
