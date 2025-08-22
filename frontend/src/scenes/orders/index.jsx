// src/pages/Moderator/index.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Unauthorized. Token missing!");

      const response = await axios.get(buildApiUrl(API_ENDPOINTS.GET_ALL_ORDERS), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) setOrders(response.data.orders);
      else toast.error(response.data.error || "Failed to fetch orders");
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Server error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const renderStatusChip = (status) => {
    let color = "default";
    if (status === "pending") color = "warning";
    else if (status === "completed") color = "success";
    else if (status === "canceled") color = "error";

    return <Chip label={status} color={color} sx={{ textTransform: "capitalize", fontWeight: 600 }} />;
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={4} bgcolor="#f5f5f5" minHeight="100vh">
      <Typography variant="h4" fontWeight={700} mb={4} color="primary">
        All Orders
      </Typography>

      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Buyer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>NFT</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow
                  key={order._id}
                  hover
                  sx={{
                    "&:hover": { backgroundColor: "#f1f1f1", cursor: "pointer" },
                  }}
                >
                  <TableCell>{order.buyer?.username || "N/A"}</TableCell>
                  <TableCell>{order.nft?.name || "N/A"}</TableCell>
                  <TableCell>${order.nft?.price || 0}</TableCell>
                  <TableCell>{renderStatusChip(order.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrdersPage;
