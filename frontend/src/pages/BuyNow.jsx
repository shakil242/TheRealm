// src/pages/BuyNow.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS, buildApiUrl } from "../config/api";

const BuyNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  // ✅ Fetch NFT details
  const fetchNFT = async () => {
    setLoading(true);
    try {
      const response = await axios.get(buildApiUrl(`/api/nfts/${id}`));
      if (response.data.success) {
        setNft(response.data.nft);
      } else {
        toast.error(response.data.error || "Failed to load NFT");
      }
    } catch (error) {
      toast.error("Error fetching NFT details");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Checkout handler
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("You must be logged in to checkout.");

      const response = await axios.post(
        buildApiUrl(API_ENDPOINTS.PLACE_ORDER),
        { nftId: nft._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("✅ NFT purchased successfully!");
        setShowCheckout(false);

        // small delay so user sees toast
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        toast.error(response.data.message || "Order failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error during checkout");
    }
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400 text-lg animate-pulse">Loading NFT...</p>
      </div>
    );

  if (!nft)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">NFT not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100 p-8 relative">
      {/* ⚡ Removed ToastContainer from here → move to App.jsx */}

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - NFT Image */}
        <div className="bg-[#111] rounded-lg shadow-lg overflow-hidden">
          <img
            src={`http://localhost:5001/uploads/${nft.image}`}
            alt={nft.name}
            className="w-full h-[400px] object-contain"
          />
        </div>

        {/* Right - NFT Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{nft.name}</h1>
          <p className="text-purple-400 text-2xl font-semibold mb-2">
            ${nft.price}
          </p>
          <p
            className={`mb-4 ${
              nft.stock > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {nft.stock > 0 ? `${nft.stock} in stock` : "Out of stock"}
          </p>

          <button
            onClick={() => setShowCheckout(true)}
            disabled={nft.stock <= 0}
            className={`px-6 py-3 rounded-lg text-lg font-semibold transition w-full md:w-auto ${
              nft.stock > 0
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            {nft.stock > 0 ? "Proceed to Checkout" : "Sold Out"}
          </button>

          {/* Metadata */}
          <div className="mt-6 text-sm text-gray-400 space-y-1">
            <p>
              <strong>SKU:</strong> {nft.sku || "N/A"}
            </p>
            <p>
              <strong>Category:</strong> {nft.category || "NFT"}
            </p>
            <p>
              <strong>Tags:</strong> {nft.tags?.join(", ") || "None"}
            </p>
            <p>
              <strong>Product ID:</strong> {nft._id}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Bright Checkout Overlay */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Confirm Your Order
            </h2>

            <img
              src={`http://localhost:5001/uploads/${nft.image}`}
              alt={nft.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-800">{nft.name}</h3>
            <p className="text-gray-500 mb-2">Category: {nft.category}</p>

            {/* ✅ Total Price */}
            <div className="flex justify-between items-center my-4 p-3 bg-gray-100 rounded-lg">
              <span className="text-gray-600 font-medium">Total Price:</span>
              <span className="text-green-600 font-bold text-xl">
                ${nft.price}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-xl font-semibold shadow-md transition duration-300 ease-in-out"
            >
              ✅ Place your order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyNow;
