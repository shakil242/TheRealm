import React, { useState } from "react";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

const Authentication = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-md mx-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === "login"
                  ? "bg-gray-800 text-white border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="font-medium">Login</span>
            </button>

            <button
              onClick={() => setActiveTab("register")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === "register"
                  ? "bg-gray-800 text-white border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="font-medium">Register</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {activeTab === "login" ? (
            <Login onClose={onClose} />
          ) : (
            <Signup onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
