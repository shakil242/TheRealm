import React, { useState } from "react";

// Import all dashboard components
import Overview from "./Overview";
import MyNFTs from "./MyNFTs";
import AddNFT from "./AddNft";
import Sidebar from "./Sidebar";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home/login after logout
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Moderator Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">Moderator</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && <Overview />}
          {activeTab === "nfts" && <MyNFTs />}
          {activeTab === "add" && <AddNFT />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
