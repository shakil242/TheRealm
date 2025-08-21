import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("userinfo");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Login (admin, moderator, user)
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        buildApiUrl(API_ENDPOINTS.LOGIN),
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // backend should return user object + token
      const userData = res.data.user || res.data.admin; // admin may be in res.data.admin
      const jwtToken = res.data.token;

      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem("userinfo", JSON.stringify(userData));
      localStorage.setItem("token", jwtToken);

      return { success: true, user: userData, token: jwtToken };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Register
  const register = async (username, email, password, role = "user") => {
    try {
      const res = await axios.post(
        buildApiUrl(API_ENDPOINTS.REGISTER),
        { username, email, password, role },
        { headers: { "Content-Type": "application/json" } }
      );

      const userData = res.data.user || res.data.admin;
      const jwtToken = res.data.token;

      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem("userinfo", JSON.stringify(userData));
      localStorage.setItem("token", jwtToken);

      return { success: true, user: userData, token: jwtToken };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
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

  // Refresh user info from backend
  const refreshUser = async () => {
    try {
      if (!token) return;
      const res = await axios.get(buildApiUrl(API_ENDPOINTS.PROFILE), {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user || res.data.admin);
      localStorage.setItem("userinfo", JSON.stringify(res.data.user || res.data.admin));
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };

  useEffect(() => {
    refreshUser();
    const interval = setInterval(() => refreshUser(), 5000); // optional refresh
    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        register,
        refreshUser,
        isAuthenticated: !!user,
        role: user?.role || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
