import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";

// Create Auth Context
const AuthContext = createContext();

// Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("userinfo");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        buildApiUrl(API_ENDPOINTS.LOGIN),
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const userData = res.data;

      setUser(userData.admin);
      setToken(userData.token);

      
      localStorage.setItem("token", userData.token);

      return { success: true, user: userData.admin, token: userData.token };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      };
    }
  };

  // Register
  const signup = async (username, email, password) => {
    try {
      const res = await axios.post(
        buildApiUrl(API_ENDPOINTS.REGISTER),
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const newUser = res.data;

      setUser(newUser.admin);
      setToken(newUser.token);

    

      return { success: true, user: newUser.admin, token: newUser.token };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("userinfo");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
