import React, { useState } from "react";
import Authentication from "../components/Authentication";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";


const Profile = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col mt-20 items-center justify-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          You are not logged in
        </h2>
        <p className="text-gray-600 mb-6">
          Please sign up or log in to view your profile details.
        </p>

        {/* 🔹 Trigger Auth Modal just like Navbar */}
        <button
          onClick={() => setAuthModalOpen(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
        >
          Sign Up / Login
        </button>

        {/* 🔹 Same modal as Navbar */}
        <Authentication
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="pt-30 bg-gray-100 py-30 px-6">
      {/* 👆 Replaced mt-40 with pt-20 so navbar height stays fixed */}

      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

          {/* Avatar */}
          <div className="flex justify-center -mt-16">
            <img
              src={user?.avatar || "https://i.pravatar.cc/150?u=" + user?.username}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>

         <div className="text-center px-6 py-4">
  <h2 className="text-2xl font-bold text-gray-800">
    {user?.username || "Guest User"}
  </h2>
  <p className="text-gray-600">{user?.email || "No email provided"}</p>
  <p className="text-gray-500 mt-1">
    Role: <span className="font-medium text-gray-800">{user?.role || "N/A"}</span>
  </p>
</div>

          {/* Profile Stats */}
          <div className="flex justify-around border-t border-gray-200 py-4">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">12</p>
              <p className="text-gray-500 text-sm">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">5</p>
              <p className="text-gray-500 text-sm">Wishlist</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">3</p>
              <p className="text-gray-500 text-sm">Reviews</p>
            </div>
          </div>

          {/* Actions */}
         {/* Actions */}
{/* Actions */}
<div className="p-6 flex flex-col sm:flex-row gap-4 justify-center">
  <button className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">
    Edit Profile
  </button>
  <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition">
    Settings
  </button>

  {/* Show Dashboard only for moderators */}
  {user?.role === "moderator" && (
    <Link
      to="/dashboard"
      className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center"
    >
      Dashboard
    </Link>
  )}

  <button
    className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
    onClick={logout}
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
