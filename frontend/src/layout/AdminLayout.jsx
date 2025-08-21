import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../admincomponents/Sidebar"; // your admin sidebar

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar drawerWidth={240} />
      <main className="flex-1 ml-[240px] bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
