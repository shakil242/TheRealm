import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import { FaUserCircle, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    moderators: 0,
    orders: 12,
    wishlist: 5,
    reviews: 3,
  });

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home
  };

  // Fetch user & moderator counts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/admin/stats"); // Your API endpoint
        setStats((prev) => ({
          ...prev,
          users: response.data.users,
          moderators: response.data.moderators,
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.username || "User"}!
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition transform hover:scale-105"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </header>

      {/* User Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center gap-6">
        <FaUserCircle className="text-8xl text-gray-400" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user?.username || "Guest"}</h2>
          <p className="text-gray-500 mt-1">{user?.email || "No email provided"}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <FaChartLine className="text-4xl text-purple-600 mb-2" />
          <h3 className="text-xl font-semibold text-gray-800">Users</h3>
          <p className="text-gray-500 mt-1 text-lg">{stats.users}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <FaChartLine className="text-4xl text-green-500 mb-2" />
          <h3 className="text-xl font-semibold text-gray-800">Moderators</h3>
          <p className="text-gray-500 mt-1 text-lg">{stats.moderators}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <FaChartLine className="text-4xl text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold text-gray-800">Orders</h3>
          <p className="text-gray-500 mt-1 text-lg">{stats.orders}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
