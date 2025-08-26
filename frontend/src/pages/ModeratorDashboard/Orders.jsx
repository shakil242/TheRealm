// src/pages/vendor/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { useAuth } from "../../Context/AuthContext";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Select,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  const { user } = useAuth();

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("Token missing");

      const response = await axios.get(
        buildApiUrl(API_ENDPOINTS.GET_SPECIFIC_CREATOR_ORDER.replace(":userId", user?._id)),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.error("Failed to fetch orders:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        buildApiUrl(API_ENDPOINTS.CONFIRM_ORDER.replace(":orderId", orderId)),
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: newStatus } : o
          )
        );
        setToast({ open: true, message: "Order status updated!", type: "success" });
      } else {
        setToast({ open: true, message: "Failed to update status.", type: "error" });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setToast({ open: true, message: "Something went wrong.", type: "error" });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      sx={{ bgcolor: "#101828", color: "#e0e0e0", py: 4 }}
    >
      <Box width="100%" maxWidth="950px">
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="white">
          All Orders
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "#1E2939", // darker background for table
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#333347" }}>
              <TableRow>
                <TableCell align="center" sx={{ color: "#f5f5f5" }}><strong>Buyer</strong></TableCell>
                <TableCell align="center" sx={{ color: "#f5f5f5" }}><strong>NFT</strong></TableCell>
                <TableCell align="center" sx={{ color: "#f5f5f5" }}><strong>Price</strong></TableCell>
                <TableCell align="center" sx={{ color: "#f5f5f5" }}><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell align="center" colSpan={4} sx={{ color: "#bbb" }}>
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow
                    key={order._id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#3a3a4f" },
                      transition: "background 0.2s ease",
                    }}
                  >
                    <TableCell align="center" sx={{ color: "#ddd" }}>
                      {order.buyer?.username}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#ddd" }}>
                      {order.nft?.name}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#ddd" }}>
                      ${order.nft?.price}
                    </TableCell>
                    <TableCell align="center">
                      <Select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        size="small"
                        sx={{
                          bgcolor: "#44445a",
                          color: "#fff",
                          "& .MuiSvgIcon-root": { color: "#bbb" },
                        }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="confirmed">Confirmed</MenuItem>
                        <MenuItem value="canceled">Canceled</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={4} sx={{ color: "#bbb" }}>
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Snackbar Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.type}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Orders;
