import React from "react";
import { FaPlus, FaThList, FaChartLine, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const tabs = [
    { key: "overview", label: "Overview", icon: <FaChartLine /> },
    { key: "nfts", label: "My NFTs", icon: <FaThList /> },
    { key: "add", label: "Add NFT", icon: <FaPlus /> },
  ];

  return (
    <aside className="bg-gray-900 w-64 h-screen p-6 flex flex-col justify-between border-r border-gray-800 shadow-lg">
      {/* Logo / Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-widest">NFT DASHBOARD</h2>
        <p className="text-gray-100 text-base mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300
              ${
                activeTab === tab.key
                  ? "bg-purple-600 text-white font-semibold shadow-lg"
                  : "text-gray-300 hover:bg-purple-800 hover:text-white"
              }
            `}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-sm md:text-base">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Profile & Logout Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => navigate("/profile")}
          className="w-full flex items-center gap-3 px-4 py-2 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
        >
          <FaUser />
          <span>Profile</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
