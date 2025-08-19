import mongoose from "mongoose";

const nftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "NFT name is required"],
    },
    description: {
      type: String,
      required: [true, "NFT description is required"],
    },
    image: {
      type: String,
      required: [true, "NFT image URL is required"],
    },
    price: {
      type: Number,
      required: [true, "NFT price is required"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to the user who added it
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
  },
  { timestamps: true }
);

const NFT = mongoose.model("NFT", nftSchema);

export default NFT;
