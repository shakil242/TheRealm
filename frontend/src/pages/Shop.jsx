import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS, buildApiUrl } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Shop = () => {
  const { user, isAuthenticated } = useAuth();
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllNFTs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(buildApiUrl(API_ENDPOINTS.GET_ALL_NFTS));
      if (response.data.success) {
        const vendorNFTs = response.data.nfts.filter(
          (nft) =>
            nft.status === "available" 
        );
        setNFTs(vendorNFTs);
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
    <div className="min-h-screen px-12 py-10 bg-black text-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-wide text-white uppercase">
          Marketplace
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Browse exclusive NFTs from vendors
        </p>
      </div>

      <div className="flex justify-between items-center mb-10 text-gray-400 text-sm border-b border-gray-800 pb-3">
        <p>
          Showing{" "}
          <span className="text-white font-semibold">{nfts.length}</span> items
        </p>
        <select className="bg-black border border-gray-700 px-3 py-1 text-gray-300 uppercase text-xs tracking-wider focus:outline-none">
          <option>Default</option>
          <option>Price: Low → High</option>
          <option>Price: High → Low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading NFTs...</p>
      ) : nfts.length === 0 ? (
        <p className="text-center text-gray-500">
          No NFTs available from vendors.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {nfts.map((nft) => (
            <div
              key={nft._id}
              className="bg-neutral-900 border border-gray-800 shadow-lg hover:shadow-purple-700/20 transition transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="w-full flex items-center justify-center bg-black border-b border-gray-800">
                <img
                  src={`http://localhost:5001/uploads/${nft.image}`}
                  alt={nft.name}
                  className="max-h-full max-w-full object-cover"
                />
              </div>

              <div className="p-5 flex flex-col items-start w-full">
                <div className="flex justify-between items-center w-full">
                  <h2 className="font-semibold text-base text-white uppercase tracking-wide truncate">
                    {nft.name}
                  </h2>
                  <p className="text-purple-500 font-bold text-sm ml-3 whitespace-nowrap">
                    {nft.price} ETH
                  </p>
                </div>

               
                  <button
                    onClick={() => navigate(`/nft/${nft._id}`)}
                    className="mt-5 w-full cursor-pointer py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm uppercase tracking-wider transition shadow-sm hover:shadow-lg"
                  >
                    BUY NOW
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
