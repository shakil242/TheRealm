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
} from "@mui/material";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";

const vendorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending vendor requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(buildApiUrl(API_ENDPOINTS.GET_ALL_USERS)); // get all users
      const pendingMods = res.data.users.filter(
       (user) => ["vendor", "user"].includes(user.role) && user.status === "pending"

      );
      setRequests(pendingMods);
    } catch (err) {
      console.error("Failed to fetch requests:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve a vendor
  const approvevendor = async (userId) => {
    try {
      const res = await axios.put(
        buildApiUrl(API_ENDPOINTS.UPDATE_STATUS.replace(":userId", userId)),
        { status: "active" }
      );

      if (res.data.success) {
        setRequests((prev) => prev.filter((user) => user._id !== userId));
      }
    } catch (err) {
      console.error("Failed to approve vendor:", err.response?.data || err.message);
    }
  };

  if (loading) return <p>Loading vendor requests...</p>;

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        vendor Requests
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => approvevendor(user._id)}
                  >
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {requests.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No pending vendor requests.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default vendorRequests;
