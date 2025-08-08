import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { buildApiUrl } from "../config/api";

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
        buildApiUrl("/api/users/login"),
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userData = response.data;
      setUser(userData);
      localStorage.setItem("userinfo", JSON.stringify(userData));
      return { success: true, data: userData };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userinfo");
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        buildApiUrl("/api/users/register"),
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newUser = response.data;
      setUser(newUser);
      localStorage.setItem("userinfo", JSON.stringify(newUser));
      return { success: true, data: newUser };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
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
