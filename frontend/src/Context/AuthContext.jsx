import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on app start
  useEffect(() => {
    const userInfo = localStorage.getItem("userinfo");
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (error) {
        console.error("Error parsing user info:", error);
        localStorage.removeItem("userinfo");
      }
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        buildApiUrl(API_ENDPOINTS.LOGIN),
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const userData = response.data;

      setUser(userData.user);
      localStorage.setItem("userinfo", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token);

      return { success: true, user: userData.user, token: userData.token };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed. Please try again.",
      };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userinfo");
    localStorage.removeItem("token");
  };

  // Register
  const register = async (username, email, password, role) => {
    try {
      const response = await axios.post(
        buildApiUrl(API_ENDPOINTS.REGISTER),
        {
          username,
          email,
          password,
          role: role || "user",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const newUser = response.data;
      setUser(newUser.user);
      localStorage.setItem("userinfo", JSON.stringify(newUser.user));
      localStorage.setItem("token", newUser.token);

      return { success: true, user: newUser.user };
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed. Please try again.",
      };
    }
  };

  // Refresh user info from backend
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(buildApiUrl(API_ENDPOINTS.PROFILE), {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user);
      localStorage.setItem("userinfo", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("Failed to refresh user:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    refreshUser();
    const interval = setInterval(() => {
      refreshUser();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status: user?.status || null, // <-- status available
        loading,
        login,
        logout,
        register,
        refreshUser,
        isAuthenticated: !!user , // only active users are authenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
