import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";

const MyNFTs = () => {
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch NFTs from backend
  // Fetch NFTs from backend
  const fetchNFTs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(buildApiUrl(API_ENDPOINTS.GET_MY_NFTS), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        // filter only available NFTs
        const availableNFTs = response.data.nfts.filter(
          (nft) => nft.status === "available"
        );
        setNftList(availableNFTs);
      } else {
        toast.error(response.data.error || "Failed to load NFTs");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Server error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  // Delete NFT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this NFT?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(buildApiUrl(`/api/nfts/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success("NFT deleted successfully!");
        setNftList((prev) => prev.filter((nft) => nft._id !== id));
      } else {
        toast.error(response.data.error || "Failed to delete NFT");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Server error. Try again!");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My NFTs</h1>

      {loading ? (
        <p className="text-gray-500">Loading NFTs...</p>
      ) : nftList.length === 0 ? (
        <p className="text-gray-500">No NFTs found. Add some new ones!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nftList.map((nft) => (
            <div
              key={nft._id}
              className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={`http://localhost:5001/uploads/${nft.image}`}
                alt={nft.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-semibold text-lg text-gray-800 truncate">
                  {nft.name}
                </h2>
                <p className="text-purple-600 font-bold mt-1">PRICE: {nft.price}$</p>
               

                {/* Action buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => toast.info("Edit feature coming soon!")}
                    className="w-1/2 bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(nft._id)}
                    className="w-1/2 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
