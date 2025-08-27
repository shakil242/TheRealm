// src/pages/BuyNow.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ENDPOINTS, buildApiUrl } from "../config/api";
import { useSelector } from "react-redux";

const BuyNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get user from Redux
  const { user } = useSelector((state) => state.auth);

  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  const zoomRef = useRef(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const magnifierSize = 180;
  const zoomLevel = 2.2;

  const fetchNFT = async () => {
    setLoading(true);
    try {
      const res = await axios.get(buildApiUrl(`/api/nfts/${id}`),);
      if (res.data.success) setNft(res.data.nft);
      else toast.error(res.data.error || "Failed to load NFT");
    } catch {
      toast.error("Error fetching NFT");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  if (!user || !(user.role === "user" || user.role === "vendor")) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-3xl font-bold text-gray-100 mb-4">Access Denied</h2>
        <p className="text-gray-400 mb-6">Only regular users can purchase NFTs.</p>
      </div>
    );
  }

  const handleProceedCheckout = () => setShowCheckout(true);

  const handleCheckout = async () => {
    try {
      const res = await axios.post(buildApiUrl(API_ENDPOINTS.PLACE_ORDER), {
        nftId: nft._id,
        userId: user._id,
         // send current user ID to backend
      },{withCredentials:true});

      if (res.data.success) {
        toast.success("✅ NFT purchased successfully!");
        setShowCheckout(false);
        setTimeout(() => navigate("/purchases"), 1500);
      } else {
        toast.error(res.data.message || "Order failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during checkout");
    }
  };

  const handleMouseMove = (e) => {
    const { left, top } = zoomRef.current.getBoundingClientRect();
    setMagnifierPos({ x: e.clientX - left, y: e.clientY - top });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400 animate-pulse">Loading NFT...</p>
      </div>
    );

  if (!nft)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">NFT not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100 p-8 relative">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* NFT Image */}
        <div
          ref={zoomRef}
          className="w-full h-[420px] bg-[#111] shadow-lg overflow-hidden relative flex items-center justify-center"
          onMouseEnter={() => setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={`http://localhost:5001/uploads/${nft.image}`}
            alt={nft.name}
            className="max-h-full max-w-full object-contain"
          />

          {showMagnifier && (
            <div
              style={{
                position: "absolute",
                pointerEvents: "none",
                height: magnifierSize,
                width: magnifierSize,
                top: magnifierPos.y - magnifierSize / 2,
                left: magnifierPos.x - magnifierSize / 2,
                border: "2px solid #aaa",
                borderRadius: "50%",
                backgroundColor: "white",
                backgroundImage: `url(http://localhost:5001/uploads/${nft.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${zoomRef.current.offsetWidth * zoomLevel}px ${
                  zoomRef.current.offsetHeight * zoomLevel
                }px`,
                backgroundPositionX: -magnifierPos.x * zoomLevel + magnifierSize / 2,
                backgroundPositionY: -magnifierPos.y * zoomLevel + magnifierSize / 2,
                zIndex: 20,
              }}
            />
          )}
        </div>

        {/* NFT Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{nft.name}</h1>
          <p className="text-purple-400 text-2xl font-semibold mb-4">{nft.price} ETH</p>

          <button
            onClick={handleProceedCheckout}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg w-full"
          >
            Proceed to Checkout
          </button>

          <div className="mt-6 text-sm text-gray-400 space-y-1">
            <p><strong>SKU:</strong> {nft.sku || "N/A"}</p>
            <p><strong>Category:</strong> {nft.category || "NFT"}</p>
            <p><strong>Tags:</strong> {nft.tags?.join(", ") || "None"}</p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Confirm Your Order</h2>
            <img
              src={`http://localhost:5001/uploads/${nft.image}`}
              alt={nft.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-lg font-semibold mb-2">{nft.name}</p>
            <div className="flex justify-between items-center my-4 p-3 bg-gray-100 rounded-lg">
              <span>Total Price:</span>
              <span className="text-purple-600 font-bold text-xl">{nft.price} ETH</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyNow;
