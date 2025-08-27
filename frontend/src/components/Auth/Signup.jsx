import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice"; // only store user info

const Signup = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    agreeToTerms: false,
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

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    setIsLoading(false);
    return;
  }

  try {
    const res = await axios.post(
      buildApiUrl(API_ENDPOINTS.REGISTER),
      {
        name: formData.username, // backend expects 'name', not 'username'
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // receive HTTP-only cookie
      }
    );

    const { user, token } = res.data;

    if (user && token) {
      // Store user info and token in Redux
      dispatch(setCredentials({ user, token }));

      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/"); // redirect after signup
      if (onClose) onClose();
    } else {
      toast.error("Signup failed");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.error || "An error occurred during signup",
      { position: "top-right", autoClose: 5000 }
    );
    console.error("Signup error:", error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ToastContainer />

      {/* Username */}
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter your username"
        required
        className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
        className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
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

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
          className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {showConfirmPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Role */}
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="user">User</option>
        <option value="vendor">Vendor</option>
      </select>

      {/* Terms */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          required
          className="mt-1 w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
        />
        <label className="text-sm text-white leading-relaxed">
          I agree to the terms and conditions.
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !formData.agreeToTerms}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition duration-300 uppercase tracking-wide"
      >
        {isLoading ? "Signing up..." : "SIGN UP"}
      </button>
    </form>
  );
};

export default Signup;
