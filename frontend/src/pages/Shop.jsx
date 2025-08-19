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
        setNFTs(response.data.nfts);
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
        <p className="text-center text-gray-500">No NFTs available in the shop.</p>
      ) : (
        <div className="flex justify-center gap-6 flex-wrap">
          {nfts.slice(0, 3).map((nft) => (
            <div
              key={nft._id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 w-100"
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
                <h2 className="font-semibold text-sm text-gray-100 truncate">
                  {nft.name}
                </h2>
                <p className="text-purple-400 font-semibold text-xs mb-2">
                  {nft.price} ETH
                </p>
                <p className="text-gray-400 text-xs truncate">{nft.description}</p>

                <button className="w-full bg-purple-600 text-white py-2 mt-3 rounded-lg text-xs hover:bg-purple-700 transition">
                  Buy Now
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
