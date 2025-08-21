import React, { useState, useEffect } from "react";

// Import all dashboard components
import Overview from "./Overview";
import MyNFTs from "./MyNFTs";
import AddNFT from "./AddNft";
import PendingNFTs from "./PendingNFTs";
import Sidebar from "./Sidebar";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ModeratorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { logout, refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser(); // fetch latest role & info
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home/login after logout
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main content */}
          {/* Updated: Added md:ml-64 to apply the margin only on medium screens and up */}
          <main className="flex-1 p-6 md:ml-64">
            {activeTab === "overview" && <Overview />}
            {activeTab === "nfts" && <MyNFTs />}
            {activeTab === "pending" && <PendingNFTs />}
            {activeTab === "add" && <AddNFT />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;