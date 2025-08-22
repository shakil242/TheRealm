import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS, buildApiUrl } from "../config/api";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllNFTs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(buildApiUrl(API_ENDPOINTS.GET_ALL_NFTS));
      if (response.data.success) {
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

  useEffect(() => {
    fetchAllNFTs();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-900 text-gray-100">
      <ToastContainer />

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white">SHOP</h1>
        <p className="text-gray-400 mt-2 text-sm">Home / Shop</p>
      </div>

      {/* Sorting + Count */}
      <div className="flex justify-between items-center mb-6 text-gray-400 text-sm">
        <p>
          Showing <span className="text-purple-400">{nfts.length}</span> results
        </p>
        <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-gray-300 focus:outline-none">
          <option>Default sorting</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading NFTs...</p>
      ) : nfts.length === 0 ? (
        <p className="text-center text-gray-500">
          No NFTs available from moderators.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {nfts.map((nft) => (
            <div
              key={nft._id}
              onClick={() => navigate(`/nft/${nft._id}`)}
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition transform hover:scale-105"
            >
              {/* NFT Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={`http://localhost:5001/uploads/${nft.image}`}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* NFT Info */}
              <div className="p-4 text-center">
                <h2 className="font-semibold text-base text-gray-100 truncate">
                  {nft.name}
                </h2>
                <p className="text-purple-400 font-semibold text-sm mt-2">
                  {nft.price} ETH
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
