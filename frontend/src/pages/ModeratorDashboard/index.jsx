import React, { useState, useEffect } from "react";

// Import all dashboard components
import Overview from "./Overview";
import MyNFTs from "./MyNFTs";
import AddNFT from "./AddNft";
import PendingNFTs from "./PendingNFTs";
import Orders from "./Orders";
import SidebarMUI from "./Sidebar"; // ✅ Import MUI sidebar
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ModeratorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true); // control MUI drawer
  const { logout, refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser(); // fetch latest role & info
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home/login after logout
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="bg-white min-h-screen flex">
      {/* Sidebar */}
      <SidebarMUI
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <main className="flex-1 p-6" style={{ marginLeft: sidebarOpen ? 256 : 0, transition: "margin-left 0.3s" }}>
        {activeTab === "overview" && <Overview />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "nfts" && <MyNFTs />}
        {activeTab === "pending" && <PendingNFTs />}
        {activeTab === "add" && <AddNFT />}
      </main>
    </div>
  );
};

export default ModeratorDashboard;
