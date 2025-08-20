import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  const storedToken = token || localStorage.getItem("token");

  if (!storedToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
