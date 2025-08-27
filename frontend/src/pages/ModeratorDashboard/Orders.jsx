// src/pages/vendor/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
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
  CircularProgress,
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  // Fetch orders for this vendor
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(buildApiUrl(API_ENDPOINTS.GET_SPECIFIC_CREATOR_ORDER),{withCredentials:true});
      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setToast({ open: true, message: response.data.error || "Failed to fetch orders.", type: "error" });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setToast({ open: true, message: "Error fetching orders", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        buildApiUrl(API_ENDPOINTS.CONFIRM_ORDER.replace(":orderId", orderId)),
        { status: newStatus },
        {withCredentials:true}
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
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
      sx={{ bgcolor: "#101828", color: "#e0e0e0", py: 4, px: 2 }}
    >
      <Box width="100%" maxWidth="1000px">
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold" color="white">
          Vendor Orders
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, overflow: "hidden", bgcolor: "#1E2939" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#333347" }}>
              <TableRow>
                <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                  <strong>Buyer</strong>
                </TableCell>
                <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                  <strong>NFT</strong>
                </TableCell>
                <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                  <strong>Price</strong>
                </TableCell>
                <TableCell align="center" sx={{ color: "#f5f5f5" }}>
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={28} sx={{ color: "#bbb" }} />
                    <Typography variant="body2" color="gray" mt={1}>
                      Loading orders...
                    </Typography>
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
                      {order.buyer?.username || order.buyer?.email || "Unknown"}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#ddd" }}>
                      {order.nft?.name || "N/A"}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#ddd" }}>
                      ${order.nft?.price?.toFixed(2) || "0.00"}
                    </TableCell>
                    <TableCell align="center">
                      <Select
                        value={order.status || "pending"}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        size="small"
                        sx={{
                          bgcolor: "#44445a",
                          color: "#fff",
                          "& .MuiSvgIcon-root": { color: "#bbb" },
                          borderRadius: 2,
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
                  <TableCell align="center" colSpan={4} sx={{ color: "#bbb", py: 4 }}>
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
