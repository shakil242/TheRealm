import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  const location = useLocation();

  // Check if current path starts with "/dashboard"
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
     { !isDashboard && <Navbar />}
      <div className="flex-1">
        <Outlet />
        {children}
      </div>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default Layout;
