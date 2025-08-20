import User from "../model/user.js";

// Get all users including moderators
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users (no role filter)
    const users = await User.find().select("-password"); // exclude passwords
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params; // user ID from URL
    const { role } = req.body; // new role from request body

    if (!role) {
      return res.status(400).json({ success: false, message: "Role is required" });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update role
    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user role",
      error: error.message,
    });
  }
};
// Update user status (e.g., approve moderator)
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params; // user ID from URL
    const { status } = req.body;   // new status from request body

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update status
    user.status = status;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user status",
      error: error.message,
    });
  }
};
