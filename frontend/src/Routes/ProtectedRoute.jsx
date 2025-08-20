import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, status, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // If not authenticated or user is pending approval
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user exists but status is not active
  if (status !== "active") {
    return (
      <div className="text-center mt-10">
        Your account is pending approval. Please wait for the admin to activate it.
      </div>
    );
  }

  // If a requiredRole is specified, check it
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
