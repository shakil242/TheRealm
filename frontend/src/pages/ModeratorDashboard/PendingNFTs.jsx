// src/pages/PendingNFTs.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // ✅ Redux
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";

const PendingNFTs = () => {
 
  const [pendingNFTs, setPendingNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyNFTs = async () => {
     // don't fetch if token is missing
    setLoading(true);
    try {
      const response = await axios.get(buildApiUrl(API_ENDPOINTS.GET_MY_NFTS), {
        withCredentials:true
       
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
      toast.error(error.response?.data?.error || "Server error. Try again!");
      console.error("Error fetching pending NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyNFTs();
  }, []); // ✅ refetch if token changes

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="px-6 py-10 text-white">
        <ToastContainer />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm">
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
            <p className="text-gray-300 text-lg">🚀 You have no pending NFTs.</p>
            <p className="text-gray-500 text-sm mt-2">
              Add new NFTs and they’ll appear here for review.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pendingNFTs.map((nft) => (
              <div
                key={nft._id}
                className="bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                {/* Image with aspect ratio */}
                <div className="aspect-[4/3] w-full bg-gray-700 overflow-hidden">
                  <img
                    src={`http://localhost:5001/uploads/${nft.image}`}
                    alt={nft.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* NFT Info */}
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-white truncate">{nft.name}</h2>
                    <p className="text-indigo-400 font-bold text-sm">{nft.price} ETH</p>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-md bg-yellow-400 text-gray-900">
                      ⏳ Pending Approval
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingNFTs;
