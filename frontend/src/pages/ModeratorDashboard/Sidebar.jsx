import React from "react";
import { FaPlus, FaThList, FaChartLine, FaUser, FaClock, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// The sidebar now accepts an `isOpen` and `toggleSidebar` prop
const Sidebar = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const tabs = [
    { key: "overview", label: "Overview", icon: <FaChartLine /> },
    { key: "nfts", label: "My NFTs", icon: <FaThList /> },
    { key: "pending", label: "Pending NFTs", icon: <FaClock /> },
    { key: "add", label: "Add NFT", icon: <FaPlus /> },
  ];

  return (
    <>
      {/* Mobile Overlay for when the sidebar is open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 z-30 bg-gray-900 opacity-50 transition-opacity duration-300"
        ></div>
      )}

      {/* Main Sidebar */}
      <aside
        className={`
          bg-gray-900 w-64 h-screen fixed top-0 left-0 z-40
          md:flex flex-col border-r border-gray-800 shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close Button for Mobile */}
        <div className="md:hidden absolute top-4 right-4 text-white cursor-pointer" onClick={toggleSidebar}>
          <FaTimes size={20} />
        </div>

        {/* Top Section - Non-scrollable */}
        <div className="flex-shrink-0 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-widest">
              NFT DASHBOARD
            </h2>
            <p className="text-gray-100 text-base mt-1">Admin Panel</p>
          </div>
        </div>

        {/* Navigation - Scrollable section */}
        <nav className="flex-1 overflow-y-auto px-6">
          <ul className="flex flex-col space-y-3">
            {tabs.map((tab) => (
              <li key={tab.key}>
                <button
                  onClick={() => {
                    setActiveTab(tab.key);
                    toggleSidebar(); // Close sidebar on mobile after selection
                  }}
                  className={`flex items-center gap-4 w-full px-4 py-3 rounded-lg transition-all duration-300
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
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile Button - Non-scrollable */}
        <div className="flex-shrink-0 p-6 border-t border-gray-800">
          <button
            onClick={() => navigate("/profile")}
            className="w-full flex items-center gap-3 px-4 py-2 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white rounded-lg transition-all duration-300"
          >
            <FaUser />
            <span>Profile</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
