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
};

