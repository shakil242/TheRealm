import React, { useState, useEffect } from "react";
import Authentication from "../components/Authentication";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, loading, logout, refreshUser } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser(); // fetch latest role & info
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-700">Loading profile...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col mt-20 items-center justify-center h-screen text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          You are not logged in
        </h2>
        <p className="text-gray-600 mb-6">
          Please sign up or log in to access your profile.
        </p>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
        >
          Sign Up / Login
        </button>
        <Authentication
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen mt-22 py-10 px-4 md:px-8">
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

            {/* Professional Pending Message */}
            {user?.role === "moderator" && user?.status !== "active" && (
              <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg max-w-md mx-auto shadow-sm">
                <p className="font-medium">
                  Your request to become a moderator is currently under review. You will be notified once it is approved.
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-around bg-gray-50 border-t border-gray-200 py-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">12</p>
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

          {/* Actions */}
          <div className="p-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition transform hover:scale-105">
              Edit Profile
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition transform hover:scale-105">
              Settings
            </button>

            {/* Dashboard only for active moderators */}
            {user?.role === "moderator" && user?.status === "active" && (
              <Link
                to="/dashboard"
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
