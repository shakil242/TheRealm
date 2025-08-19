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

  // Check if user is logged in on app start
  useEffect(() => {
    const userInfo = localStorage.getItem("userinfo");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user info:", error);
        localStorage.removeItem("userinfo");
      }
    }
    setLoading(false);
  }, []);

 const login = async (email, password) => {
  try {
    const response = await axios.post(
      buildApiUrl(API_ENDPOINTS.LOGIN),
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const userData = response.data;

    // Save user and token
    setUser(userData.user);
    localStorage.setItem("userinfo", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);

    // Return success with user including role
    return { success: true, user: userData.user, token: userData.token };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || "Login failed. Please try again.",
    };
  }
};

  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userinfo");
  };

  const register = async (username, email, password, role) => {
    try {
      const response = await axios.post(
        buildApiUrl(API_ENDPOINTS.REGISTER),
        {
          username,
          email,
          password,
          role: role || "user", // Use passed role or default to "user"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newUser = response.data;
      setUser(newUser.user);
      localStorage.setItem("userinfo", JSON.stringify(newUser.user));
      localStorage.setItem("token", newUser.token);
      return { success: true, data: newUser.user };
    } catch (error) {
      console.log("Backend error response:", error.response?.data);
      console.log("Full error object:", error);
      return {
        success: false,
        error:
          error.response?.data?.error ||
          "Registration failed. Please try again.",
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
