import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaPlus, FaThList, FaChartLine, FaUser, FaClock, FaHome, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidebarMUI = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // md and up = permanent

  const tabs = [
    { key: "overview", label: "Overview", icon: <FaChartLine /> },
    { key: "nfts", label: "My NFTs", icon: <FaThList /> },
    { key: "pending", label: "Pending NFTs", icon: <FaClock /> },
    { key: "add", label: "Add NFT", icon: <FaPlus /> },
    { key: "orders", label: "Orders", icon: <FaShoppingCart /> },
  ];

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"} // permanent on desktop, temporary on mobile
      open={isDesktop ? true : isOpen}
      onClose={toggleSidebar}
      anchor="left"
      PaperProps={{
        sx: {
          width: 256,
          bgcolor: "#1f2937",
          color: "white",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Top Section */}
      <Box sx={{ p: 3, flexShrink: 0 }}>
        <Box sx={{ mb: 2 }}>
          <h2 className="text-2xl font-bold tracking-widest">NFT DASHBOARD</h2>
          <p className="text-gray-100 text-base mt-1">Admin Panel</p>
        </Box>

        <ListItemButton
          onClick={() => {
            navigate("/");
            if (!isDesktop) toggleSidebar();
          }}
          sx={{
            mb: 2,
            bgcolor: "#111827",
            "&:hover": { bgcolor: "#6b21a8" },
            borderRadius: 1,
          }}
        >
          <ListItemIcon sx={{ color: "white" }}><FaHome /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Divider sx={{ borderColor: "#374151" }} />
      </Box>

      {/* Navigation Scrollable Section */}
     {/* Navigation Scrollable Section */}
<Box
  sx={{
    flex: 1,
    overflowY: "auto",
    px: 1,
    py: 2,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#1f2937", // matches sidebar background
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#4b5563", // dark gray thumb
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#6b7280", // lighter on hover
    },
    scrollbarWidth: "thin", // for Firefox
    scrollbarColor: "#4b5563 #1f2937", // thumb track for Firefox
  }}
>
  <List>
    {tabs.map((tab) => (
      <ListItemButton
        key={tab.key}
        selected={activeTab === tab.key}
        onClick={() => {
          setActiveTab(tab.key);
          if (!isDesktop) toggleSidebar();
        }}
        sx={{
          "&.Mui-selected": {
            bgcolor: "#6b21a8",
            "&:hover": { bgcolor: "#7c3aed" },
          },
          "&:hover": { bgcolor: "#4b5563" },
          borderRadius: 1,
          mb: 1,
        }}
      >
        <ListItemIcon sx={{ color: "white" }}>{tab.icon}</ListItemIcon>
        <ListItemText primary={tab.label} />
      </ListItemButton>
    ))}
  </List>
</Box>


      {/* Profile Section */}
      <Box sx={{ flexShrink: 0, p: 3, borderTop: "1px solid #374151" }}>
        <ListItemButton
          onClick={() => navigate("/profile")}
          sx={{
            bgcolor: "#111827",
            "&:hover": { bgcolor: "#2563eb" },
            borderRadius: 1,
          }}
        >
          <ListItemIcon sx={{ color: "white" }}><FaUser /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </Box>

      {/* Close Button for Mobile */}
      {!isDesktop && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
          }}
        >
          <FaTimes />
        </IconButton>
      )}
    </Drawer>
  );
};

export default SidebarMUI;
