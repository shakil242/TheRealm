import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice"; // only store user info
import { Token } from "@mui/icons-material";

const Login = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  if (!formData.email || !formData.password) {
    toast.error("Please fill in all fields", { autoClose: 3000 });
    setIsLoading(false);
    return;
  }

  try {
    const res = await axios.post(
      buildApiUrl(API_ENDPOINTS.LOGIN),
      {
        email: formData.email,
        password: formData.password,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // important for cookie auth
      }
    );

    const data = res.data; // store response in data
    const user = data.user;
    const token=data.token

    if (user && token) {
      // Only store user info in Redux (token not needed for cookie-based auth)
      dispatch(setCredentials({ user, token }));

      toast.success("Login successful!", { autoClose: 3000 });

      // Role-based redirection
      if (user.role === "admin") navigate("/dashboard");
      else if (user.role === "vendor") {
        if (user.status === "pending") {
          toast.info("Your vendor request is still pending.", {
            autoClose: 3000,
          });
          navigate("/profile");
        } else navigate("/vendor-dashboard");
      } else navigate("/");

      if (onClose) onClose();
    } else {
      toast.error("Login failed", { autoClose: 3000 });
    }
  } catch (error) {
    toast.error(
      error.response?.data?.error || "An error occurred during login",
      { autoClose: 5000 }
    );
    console.error("Login error:", error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ToastContainer />
      {/* Email Field */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Enter your email"
        className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Password Field */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
          />
          <label className="text-sm text-gray-300">Remember me</label>
        </div>
        <button
          type="button"
          className="text-sm text-purple-400 hover:text-purple-300 transition duration-300"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition duration-300 uppercase tracking-wide"
      >
        {isLoading ? "Logging in..." : "LOGIN"}
      </button>
    </form>
  );
};

export default Login;
