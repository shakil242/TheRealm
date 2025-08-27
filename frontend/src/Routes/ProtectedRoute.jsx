// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, user } = useSelector((state) => state.auth);

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Role-based protection
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
