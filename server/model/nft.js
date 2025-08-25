// models/nft.js
import mongoose from "mongoose";

const nftSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "NFT name is required"] },
    description: { type: String, required: [true, "NFT description is required"] },
    image: { type: String, required: [true, "NFT image URL is required"] },
    price: { type: Number, required: [true, "NFT price is required"] },

    // who created the collection/originally minted
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // who currently owns it (changes after a sale)
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    category: { type: String, default: "General" },

    // listing state
    isListed: { type: Boolean, default: true },

    // optional human state, can be used in UI if you like
    status: {
      type: String,
      enum: ["pending", "available", "sold"],
      default: "available",
    },

 


  },
  { timestamps: true }
);

export default mongoose.model("NFT", nftSchema);
