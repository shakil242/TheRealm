import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/Authcontext.jsx";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();
  const { user, loading, login, signup } = useAuth();

  const [tab, setTab] = useState(0); // 0 = Login, 1 = Signup
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({ confirmPassword: "", general: "" });

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "confirmPassword" || name === "password") {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({ confirmPassword: "", general: "" });

  try {
    if (tab === 0) {
      // LOGIN
      await login(formData.email, formData.password);

      // After login & getUser finished, user is set
      navigate("/dashboard");
    } else {
      // SIGNUP
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        return;
      }
       await signup(formData.username, formData.email, formData.password);


      setTab(0); // switch to login tab
    }
  } catch (err) {
    setErrors({ general: err?.message || "Something went wrong" });
  }
};


  if (loading) return <p>Loading...</p>; // optional loading screen

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0a192f",
      }}
    >
      <Paper
        elevation={10}
        sx={{ p: 4, width: 400, backgroundColor: "#f9f9f9", borderRadius: 3 }}
      >
        <Tabs
          value={tab}
          onChange={(e, newVal) => setTab(newVal)}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#1e3a8a" } }}
          sx={{ "& .MuiTab-root": { color: "#555", fontWeight: "bold" }, "& .Mui-selected": { color: "#1e3a8a" } }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          {tab === 1 && (
            <TextField
              label="Full Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {tab === 1 && (
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {errors.general && (
            <Typography color="error" sx={{ textAlign: "center", fontSize: 14 }}>
              {errors.general}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2, fontWeight: "bold", backgroundColor: "#1e3a8a", "&:hover": { backgroundColor: "#0f1d4d" } }}
          >
            {tab === 0 ? "Login" : "Sign Up"}
          </Button>

          {tab === 0 && (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 1, cursor: "pointer", color: "#1e3a8a" }}
            >
              Forgot password?
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginSignup;
