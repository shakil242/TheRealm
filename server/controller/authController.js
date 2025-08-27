import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generate JWT and store in HTTP-only cookie
const generateToken = (res, user) => {
  const expiresIn = "1d";
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

// @desc Register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role)
      return res.status(400).json({ success: false, error: "Please include all fields" });

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      const message = existingUser.email === email ? "Email already in use" : "Username already taken";
      return res.status(400).json({ success: false, error: message });
    }

    // Hash password in controller
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      status: role === "vendor" ? "pending" : "active",
    });

    await user.save();

    generateToken(res, user);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ success: true, message: "User registered successfully", user: userResponse });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || "Registration failed" });
  }
};

// @desc Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, error: "Please include email and password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, error: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, error: "Invalid credentials" });

    // Generate token
    const token = generateToken(res, user); // make generateToken return token

    const userResponse = user.toObject();
    delete userResponse.password;

    // Send token in response as well
    res.json({ success: true, message: "Logged in successfully", user: userResponse, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || "Login failed" });
  }
};


// @desc Logout user
export const logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// @desc Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// @desc Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    // Check unique username/email
    if (username && username !== user.username) {
      const exists = await User.findOne({ username });
      if (exists) return res.status(400).json({ success: false, error: "Username already taken" });
      user.username = username;
    }

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ success: false, error: "Email already in use" });
      user.email = email;
    }

    // Handle password change
    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ success: false, error: "Current password required" });

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ success: false, error: "Current password is incorrect" });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ success: true, message: "Profile updated successfully", user: userResponse });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || "Profile update failed" });
  }
};
