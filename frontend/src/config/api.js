// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',

  LOGOUT: '/api/auth/logout',
  PROFILE: '/api/auth/me',
  UPDATE_PROFILE: '/api/auth/profile',



  // NFT endpoints
  ADD_NFT: '/api/nfts',           // Add new NFT (with image)
  GET_MY_NFTS: '/api/nfts/my',    // NFTs of logged-in user
  GET_ALL_NFTS: '/api/nfts/all',  // Public: all NFTs for shop
  UPDATE_NFT: '/api/nfts/:id',    // Update NFT by id
  DELETE_NFT: '/api/nfts/:id',    // Delete NFT by id
};
