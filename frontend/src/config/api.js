// src/config/api.js
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const buildApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",
  PROFILE: "/api/auth/me",
  UPDATE_PROFILE: "/api/auth/profile",

  // User management (Admin-only)
  ADD_VENDOR: "/api/vendors",
  GET_ALL_USERS: "/api/user/data",
  UPDATE_VENDOR: "/api/user/role/:id",
  UPDATE_STATUS: "/api/user/status/:userId",
  DELETE_VENDOR: "/api/vendors/:id", // Admin approves/rejects vendors/users
  REQUEST_vendor:"/api/user/request-vendor",

  // NFT endpoints
  ADD_NFT: "/api/nfts",           // Add NFT
  GET_MY_NFTS: "/api/nfts/my",    // NFTs of logged-in user
  GET_ALL_NFTS: "/api/nfts/all",  // Public for shop
  GET_NFT_BY_ID: "/api/nfts/:id", // 👈 NEW — Get NFT by ID
  UPDATE_NFT_STATUS: "/api/nfts/:id/status", // Approve NFT
  DELETE_NFT: "/api/nfts/:id",   // Delete NFT,
  UPDATE_NFT:"/api/nfts/update-nft/:id",


  //
  PLACE_ORDER:"/api/orders/order-placed",
  MY_ORDERS:"/api/orders/my-orders",
  GET_SPECIFIC_CREATOR_ORDER: "/api/orders/creator",
  GET_ALL_ORDERS:"/api/orders/all-orders",
  CONFIRM_ORDER:"/api/orders/:orderId/status",
  NFT_RESELL: "/api/nfts/:nftId/resell",
};
