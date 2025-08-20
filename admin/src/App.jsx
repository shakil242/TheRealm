import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Siderbar";
import { Box } from "@mui/material";

// Scenes

import VendorRequest from "./scenes/VendorRequest";
import Orders from "./scenes/orders";
import Users from "./scenes/users";
import NFTRequest from "./scenes/NftRequest";
import Register from "./scenes/register";
import Dashboard from "./scenes/Dashboard";

import { AuthProvider } from "./context/Authcontext";
import ProtectedRoute from "./middleware/ProtectedRoute"; // Ensure path is correct

const AppWrapper = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const drawerWidth = 240;

  const hideSidebar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideSidebar && <Sidebar drawerWidth={drawerWidth} />}

      <Box
        component="main"
        sx={{
          marginLeft: !hideSidebar && isSidebarOpen ? `${drawerWidth}px` : 0,
          transition: "margin 0.3s",
        }}
      >
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
         
          <Route
            path="/vendor-request"
            element={
              <ProtectedRoute>
                <VendorRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nft-request"
            element={
              <ProtectedRoute>
                <NFTRequest />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
