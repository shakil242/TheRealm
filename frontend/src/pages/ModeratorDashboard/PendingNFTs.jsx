// src/pages/PendingNFTs.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";

const PendingNFTs = () => {
  const [pendingNFTs, setPendingNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyNFTs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(buildApiUrl(API_ENDPOINTS.GET_MY_NFTS), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const onlyPending = response.data.nfts.filter(
          (nft) => nft.status === "pending"
        );
        setPendingNFTs(onlyPending);
      } else {
        toast.error(response.data.error || "Failed to load NFTs");
      }
    } catch (error) {
      toast.error("Server error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyNFTs();
  }, []);

  return (
    <div className="   text-white">
      <ToastContainer />

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-black bg-clip-text  drop-shadow-lg">
          Pending NFTs
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Your NFTs are waiting for admin approval. Sit tight ✨
        </p>
      </div>

      {/* Loading / Empty */}
      {loading ? (
        <p className="text-center text-gray-400 animate-pulse">
          Loading your NFTs...
        </p>
      ) : pendingNFTs.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-gray-500 text-lg">🚀 You have no pending NFTs.</p>
          <p className="text-gray-400 text-sm mt-2">
            Add new NFTs and they’ll appear here for review.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pendingNFTs.map((nft) => (
            <div
              key={nft._id}
              className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              {/* Image */}
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={`http://localhost:5001/uploads/${nft.image}`}
                  alt={nft.name}
                  className="w-full h-full object-cover "
                />
              </div>

              {/* NFT Info */}
              <div className="p-5">
                <h2 className="font-bold text-lg text-black truncate">
                  {nft.name}
                </h2>
                <p className="text-black font-semibold text-sm mt-1">
                  {nft.price} ETH
                </p>
                

                {/* Status Badge */}
                <div className="mt-4">
                  <span className="px-4 py-2 text-xs font-semibold rounded-full bg-yellow-400/90 text-black shadow-md">
                    ⏳ Pending Approval
                  </span>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-500/20 pointer-events-none"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingNFTs;
