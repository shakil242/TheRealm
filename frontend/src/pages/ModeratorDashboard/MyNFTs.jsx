import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";

const MyNFTs = () => {
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setNftList(response.data.nfts);
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
    <div>
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">My NFTs</h1>

      {loading ? (
        <p>Loading NFTs...</p>
      ) : nftList.length === 0 ? (
        <p>No NFTs found. Add some new ones!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nftList.map((nft) => (
            <div key={nft._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
  src={`http://localhost:5001/uploads/${nft.image}`}
  alt={nft.name}
  className="w-full h-48 object-cover"
/>

              <div className="p-4">
                <h2 className="font-semibold">{nft.name}</h2>
                <p className="text-gray-500">{nft.price} ETH</p>
                <p className="text-gray-400 text-sm">{nft.description}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => toast.info("Edit feature coming soon!")}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(nft._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
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
