import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== requiredRole) {
    // Redirect non-authenticated or non-authorized users
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
