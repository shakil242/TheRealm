// src/pages/BuyNow.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ENDPOINTS, buildApiUrl } from "../config/api";
import { useAuth } from "../Context/AuthContext";

const BuyNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  // 🔍 Magnifier states
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(null);

  const magnifierSize = 180; // lens size
  const zoomLevel = 2.2; // zoom intensity

  const fetchNFT = async () => {
    setLoading(true);
    try {
      const response = await axios.get(buildApiUrl(`/api/nfts/${id}`));
      if (response.data.success) setNft(response.data.nft);
      else toast.error(response.data.error || "Failed to load NFT");
    } catch {
      toast.error("Error fetching NFT details");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedCheckout = () => {
    if (!user) return toast.error("You must be logged in to place an order.");
    if (user.role === "admin")
      return toast.error("Admins cannot buy NFTs.");
    setShowCheckout(true);
  };

  const handleCheckout = async () => {
    if (!user) return toast.error("You must be logged in to place an order.");

    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("You must be logged in to checkout.");

      const response = await axios.post(
        buildApiUrl(API_ENDPOINTS.PLACE_ORDER),
        { nftId: nft._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("✅ NFT purchased successfully!");
        setShowCheckout(false);
        setTimeout(() => navigate("/purchases"), 1500);
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

  const isAdmin = user?.role === "admin";

  // 🔍 Mouse Move Handler
  const handleMouseMove = (e) => {
    const { left, top } = zoomRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setMagnifierPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-100 p-8 relative">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 🔍 Zoomable Image with Lens */}
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
                height: `${magnifierSize}px`,
                width: `${magnifierSize}px`,
                top: `${magnifierPos.y - magnifierSize / 2}px`,
                left: `${magnifierPos.x - magnifierSize / 2}px`,
                border: "2px solid #aaa",
                borderRadius: "50%",
                backgroundColor: "white",
                backgroundImage: `url(http://localhost:5001/uploads/${nft.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${zoomRef.current.offsetWidth * zoomLevel}px ${zoomRef.current.offsetHeight * zoomLevel}px`,
                backgroundPositionX: `${-magnifierPos.x * zoomLevel + magnifierSize / 2}px`,
                backgroundPositionY: `${-magnifierPos.y * zoomLevel + magnifierSize / 2}px`,
                zIndex: 20,
              }}
            />
          )}
        </div>

        {/* NFT Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{nft.name}</h1>
          <p className="text-purple-400 text-2xl font-semibold mb-4">
            ${nft.price}
          </p>

          <button
            onClick={handleProceedCheckout}
            disabled={isAdmin}
            className={`px-6 py-3 cursor-pointer text-lg font-semibold transition w-full md:w-auto ${
              isAdmin
                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {isAdmin ? "Admins cannot buy NFTs" : "Proceed to Checkout"}
          </button>

          <div className="mt-6 text-sm text-gray-400 space-y-1">
            <p><strong>SKU:</strong> {nft.sku || "N/A"}</p>
            <p><strong>Category:</strong> {nft.category || "NFT"}</p>
            <p><strong>Tags:</strong> {nft.tags?.join(", ") || "None"}</p>
            <p><strong>Product ID:</strong> {nft._id}</p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
          <div className="bg-white shadow-xl w-[100%] max-w-md p-6 relative rounded-lg">
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
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-800">{nft.name}</h3>
            <p className="text-gray-500 mb-2">Category: {nft.category}</p>

            <div className="flex justify-between items-center my-4 p-3 bg-gray-100 rounded-lg">
              <span className="text-gray-600 font-medium">Total Price:</span>
              <span className="text-purple-600 font-bold text-xl">
                ${nft.price}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-[100%] px-6 py-3 cursor-pointer bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold shadow-md transition duration-300 ease-in-out rounded-lg"
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
