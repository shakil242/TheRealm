// src/pages/VendorDashboard.jsx
import React, { useState } from "react";

// Import all dashboard components
import MyNFTs from "./MyNFTs";
import AddNFT from "./AddNft";
import PendingNFTs from "./PendingNFTs";
import Orders from "./Orders";
import SidebarMUI from "./Sidebar"; // ✅ Import MUI sidebar
 // ✅ import logout action

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(true); // control MUI drawer
 



  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

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
      <main
        className="flex-1"
        style={{
          marginLeft: sidebarOpen ? 256 : 0,
          transition: "margin-left 0.3s",
        }}
      >
        {/* Top bar with logout */}
      

        {/* Content */}
        <div className="">
          {activeTab === "orders" && <Orders />}
          {activeTab === "nfts" && <MyNFTs />}
          {activeTab === "pending" && <PendingNFTs />}
          {activeTab === "add" && <AddNFT />}
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
