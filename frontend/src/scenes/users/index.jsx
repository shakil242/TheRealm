import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users from backend
 // Fetch all users from backend
const fetchUsers = async () => {
  try {
    const res = await axios.get(buildApiUrl(API_ENDPOINTS.GET_ALL_USERS));

    // Filter users with role 'user' or 'vendor' and status 'active'
    const filteredUsers = (res.data.users || []).filter(
      (user) => (user.role === "user" || user.role === "vendor") && user.status === "active"
    );

    setUsers(filteredUsers);
  } catch (err) {
    console.error("Failed to fetch users:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update role
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.put(
        buildApiUrl(API_ENDPOINTS.UPDATE_VENDOR.replace(":id", userId)),
        { role: newRole }
      );

      if (res.data.success) {
        setUsers((prev) =>
          prev.map((user) => (user._id === userId ? { ...user, role: newRole } : user))
        );
      }
    } catch (err) {
      console.error("Failed to update role:", err.response?.data || err.message);
    }
  };

  // Update status
  const handleStatusChange = async (userId, newStatus) => {
    try {
      const res = await axios.put(
        buildApiUrl(API_ENDPOINTS.UPDATE_STATUS.replace(":userId", userId)),
        { status: newStatus }
      );

      if (res.data.success) {
        // Remove user if status is no longer active
        setUsers((prev) =>
          prev.filter((user) => !(user._id === userId && newStatus !== "active"))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err.response?.data || err.message);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Active Users
      </Typography>

      <Box mb={2}>
        <Button variant="contained" color="primary">
          Add New User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="vendor">vendor</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user._id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  
                  <Button variant="outlined" color="error" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No active users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
