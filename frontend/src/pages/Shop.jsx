import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl } from "../config/api";

const Shop = () => {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllNFTs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(buildApiUrl("/api/nfts/all"));
      if (response.data.success) {
        // only available NFTs created by moderators
        const moderatorNFTs = response.data.nfts.filter(
          (nft) => nft.status === "available" && nft.creator?.role === "moderator"
        );
        setNFTs(moderatorNFTs);
      } else {
        toast.error(response.data.error || "Failed to load NFTs");
      }
    } catch (error) {
      toast.error("Server error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (nftId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("You must be logged in to buy.");

      const response = await axios.post(
        buildApiUrl(`/api/nfts/buy/${nftId}`),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("NFT purchased successfully!");
        fetchAllNFTs(); // refresh stock
      } else {
        toast.error(response.data.error || "Purchase failed");
      }
    } catch (error) {
      toast.error("Error processing purchase");
    }
  };

  useEffect(() => {
    fetchAllNFTs();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-100">
      <ToastContainer />

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-500 mb-2">
          NFT Marketplace
        </h1>
        <p className="text-gray-400 text-sm">
          Discover, collect, and trade exclusive NFTs from talented creators.
        </p>
      </div>

      {/* Loading / Empty */}
      {loading ? (
        <p className="text-center text-gray-500">Loading NFTs...</p>
      ) : nfts.length === 0 ? (
        <p className="text-center text-gray-500">
          No NFTs available from moderators.
        </p>
      ) : (
        <div className="flex justify-center gap-6 flex-wrap">
          {nfts.map((nft) => (
            <div
              key={nft._id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 w-72"
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={`http://localhost:5001/uploads/${nft.image}`}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* NFT Info */}
              <div className="p-4">
                <h2 className="font-semibold text-base text-gray-100 truncate">
                  {nft.name}
                </h2>
                <p className="text-purple-400 font-semibold text-sm mb-2">
                  {nft.price} ETH
                </p>
                <p className="text-gray-400 text-xs mb-2 truncate">
                  {nft.description}
                </p>

                {/* Stock Display */}
                <p
                  className={`text-xs font-semibold mb-2 ${
                    nft.stock > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {nft.stock > 0 ? `${nft.stock} in stock` : "Out of stock"}
                </p>

                <button
                  onClick={() => handleBuy(nft._id)}
                  disabled={nft.stock <= 0}
                  className={`w-full py-2 mt-3 rounded-lg text-sm font-semibold transition ${
                    nft.stock > 0
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-600 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {nft.stock > 0 ? "Buy Now" : "Sold Out"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
