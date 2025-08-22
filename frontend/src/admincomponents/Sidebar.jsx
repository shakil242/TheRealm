import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PeopleOutlined,
  ShoppingCartOutlined,
  ReceiptLongOutlined,
  AdminPanelSettingsOutlined,
  HomeOutlined,
} from "@mui/icons-material";

const navItems = [
  { text: "Dashboard", path: "/dashboard", icon: <AdminPanelSettingsOutlined fontSize="small" /> },
  { text: "Vendor Request", path: "/vendor-request", icon: <AdminPanelSettingsOutlined fontSize="small" /> },
  { text: "Orders", path: "/orders", icon: <ShoppingCartOutlined fontSize="small" /> },
  { text: "Users", path: "/users", icon: <PeopleOutlined fontSize="small" /> },
  { text: "NFT Request", path: "/nft-request", icon: <ReceiptLongOutlined fontSize="small" /> },
  { text: "All NFTs", path: "/all-nfts", icon: <AdminPanelSettingsOutlined fontSize="small" /> },
];

const Sidebar = ({ drawerWidth = 240 }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <Box
      sx={{
        width: drawerWidth,
        height: "100vh",
        background: "#1a1a2e",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        boxShadow: "2px 0 6px rgba(0,0,0,0.3)",
      }}
    >
      {/* Logo / Title */}
      <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <Typography variant="h6" fontWeight="bold">
          Admin Panel
        </Typography>
      </Box>

      {/* Menu Items */}
      <Box sx={{ flex: 1, p: 2 }}>
        {/* Home Button */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1,
            borderRadius: "8px",
            cursor: "pointer",
            mb: 2,
            background: active === "/" ? "#16213e" : "transparent",
            color: active === "/" ? "#00adb5" : "#ccc",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "#16213e",
              color: "#00adb5",
            },
          }}
        >
          <HomeOutlined fontSize="small" />
          <Typography fontSize="0.95rem">Home</Typography>
        </Box>

        {/* Other Menu Items */}
        {navItems.map(({ text, path, icon }) => (
          <Box
            key={text}
            onClick={() => navigate(path)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1,
              borderRadius: "8px",
              cursor: "pointer",
              mb: 1,
              background: active === path ? "#16213e" : "transparent",
              color: active === path ? "#00adb5" : "#ccc",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "#16213e",
                color: "#00adb5",
              },
            }}
          >
            {icon}
            <Typography fontSize="0.95rem">{text}</Typography>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: "0.8rem",
          textAlign: "center",
          color: "#888",
        }}
      >
        © 2025 Admin
      </Box>
    </Box>
  );
};

export default Sidebar;
