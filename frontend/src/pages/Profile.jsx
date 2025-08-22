// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import Authentication from "../components/Authentication";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS, buildApiUrl } from "../config/api";

const Profile = () => {
  const { user, isAuthenticated, loading, logout, refreshUser } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser(); // fetch latest role & info
  }, []);

  const handlePutOnSale = async (order) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", order.nft.name);
      formData.append("description", order.nft.description);
      formData.append("price", order.nft.price);
      formData.append("category", order.nft.category);
      formData.append("owner", user._id);

      if (order.nft.file) {
        formData.append("image", order.nft.file);
      } else if (order.nft.image) {
        const response = await fetch(buildApiUrl(`/uploads/${order.nft.image}`));
        const blob = await response.blob();
        const filename = order.nft.image.split("/").pop();
        formData.append("image", blob, filename);
      }

      const res = await axios.post(buildApiUrl(API_ENDPOINTS.ADD_NFT), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("NFT has been listed for sale!");
        setOrders((prev) =>
          prev.map((o) =>
            o._id === order._id
              ? { ...o, nft: { ...o.nft, onSale: true } }
              : o
          )
        );
      } else {
        alert("Failed to put NFT on sale.");
      }
    } catch (error) {
      console.error("Error putting NFT on sale:", error);
      alert("Something went wrong while putting NFT on sale.");
    }
  };

  const handleRequestModerator = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        buildApiUrl("/api/users/request-moderator"),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      refreshUser();
    } catch (err) {
      console.error(err);
      alert("Failed to request moderator role.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

useEffect(() => {
  const fetchOrders = async () => {
    if (!isAuthenticated) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(buildApiUrl(API_ENDPOINTS.MY_ORDERS), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        // Aggregate orders by NFT ID
        const aggregated = {};
        res.data.orders.forEach(order => {
          const nftId = order.nft._id;
          if (aggregated[nftId]) {
            aggregated[nftId].quantity += order.quantity;
          } else {
            aggregated[nftId] = { ...order }; // clone order
          }
        });
        setOrders(Object.values(aggregated));
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchOrders();
}, [isAuthenticated]);

  if (loading) return <div className="text-center text-gray-700">Loading profile...</div>;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">You are not logged in</h2>
        <p className="text-gray-600 mb-6">Please sign up or log in to access your profile.</p>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
        >
          Sign Up / Login
        </button>
        <Authentication isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          {/* Banner */}
          <div className="h-36 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

          {/* Avatar */}
          <div className="flex justify-center -mt-20">
            <img
              src={user?.avatar || "https://i.pravatar.cc/150?u=" + user?.username}
              alt="User Avatar"
              className="w-36 h-36 rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* User Info */}
          <div className="text-center px-6 py-6">
            <h2 className="text-3xl font-bold text-gray-800">{user?.username || "Guest User"}</h2>
            <p className="text-gray-600 mt-1">{user?.email || "No email provided"}</p>
            <p className="text-gray-500 mt-2">
              Role: <span className="font-semibold text-gray-800">{user?.role || "N/A"}</span>
            </p>

            {user?.role === "moderator" && user?.status !== "active" && (
              <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg max-w-md mx-auto shadow-sm">
                <p className="font-medium">
                  Your request to become a moderator is under review. You will be notified once approved.
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-around bg-gray-50 border-t border-gray-200 py-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
              <p className="text-gray-500 text-sm">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">5</p>
              <p className="text-gray-500 text-sm">Wishlist</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">3</p>
              <p className="text-gray-500 text-sm">Reviews</p>
            </div>
          </div>

          {/* Moderator CTA for users */}
          {user?.role === "user" && (
            <div className="my-6 p-6 bg-blue-100 text-blue-800 rounded-xl text-center shadow-md max-w-md mx-auto">
              Want to sell NFTs?{" "}
              <button
                onClick={handleRequestModerator}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Request Moderator Access
              </button>
            </div>
          )}

          {/* Orders List */}
       {/* Orders List */}
<div className="p-6">
  <h3 className="text-xl font-bold text-gray-800 mb-4">My Purchases</h3>

  {/* Moderator Info */}
  {user?.role === "moderator" && (
    <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow text-center max-w-md mx-auto">
      🎉 You can now list your purchased NFTs for sale once the order is confirmed!
    </div>
  )}

  {orders.length === 0 ? (
    <p className="text-gray-600">You haven’t bought any NFTs yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow rounded-xl overflow-hidden border border-gray-200 flex flex-col"
        >
          <img
            src={order.nft.image ? buildApiUrl(`/uploads/${order.nft.image}`) : "https://via.placeholder.com/300"}
            alt={order.nft.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold text-gray-800">{order.nft.name}</h4>
            <p className="text-gray-600 text-sm">Quantity: {order.quantity}</p>
            <p className="text-gray-800 font-medium">PRICE: ${order.price}</p>
            <p className="text-gray-500 text-xs mb-3">
              Purchased on {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {/* Status & Put on Sale Button */}
            {order.status === "completed" ? (
              !order.nft.onSale ? (
                user?.role === "moderator" ? (
                  <button
                    onClick={() => handlePutOnSale(order)}
                    className="mt-auto px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                  >
                    Put on Sale
                  </button>
                ) : (
                  <span className="mt-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-center">
                    Completed
                  </span>
                )
              ) : (
                <span className="mt-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-center">
                  On Sale
                </span>
              )
            ) : (
              <span className="mt-auto px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-center">
                Pending
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

          {/* Actions */}
          <div className="p-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition transform hover:scale-105">
              Edit Profile
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition transform hover:scale-105">
              Settings
            </button>

            {["moderator", "admin"].includes(user?.role) && user?.status === "active" && (
              <Link
                to={user?.role === "moderator" ? "/moderator-dashboard" : "/dashboard"}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105 text-center"
              >
                Dashboard
              </Link>
            )}

            <button
              className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition transform hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
