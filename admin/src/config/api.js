// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/api/admin/login",
  REGISTER: "/api/admin/register",
  LOGOUT: "/api/admin/logout",
  PROFILE: "/api/admin/me",
  UPDATE_PROFILE: "/api/admin/profile",

  // Vendor (if needed later)
  ADD_VENDOR: "/api/vendors",
  GET_ALL_USERS: "/api/user/data",
  UPDATE_VENDOR: "/api/user/role/:id",
  UPDATE_STATUS: "/api/user/status/:userId",
  DELETE_VENDOR: "/api/vendors/:id",

  // NFT endpoints
  ADD_NFT: "/api/nfts",            // Add new NFT (with image)
  GET_MY_NFTS: "/api/nfts/my",     // NFTs of logged-in user
  GET_ALL_NFTS: "/api/nfts/all",   // Public: all NFTs for shop
  UPDATE_NFT_STATUS: "/api/nfts/:id/status",     // Update NFT by id
  DELETE_NFT: "/api/nfts/:id",     // Delete NFT by id
};
