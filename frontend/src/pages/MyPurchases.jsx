import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { buildApiUrl, API_ENDPOINTS } from "../config/api";
import axios from "axios";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Chip, Avatar, Snackbar, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField,
} from "@mui/material";

const Purchases = () => {
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resaleDialogOpen, setResaleDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [resalePrice, setResalePrice] = useState("");
  const [resaleQuantity, setResaleQuantity] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(buildApiUrl(API_ENDPOINTS.MY_ORDERS), {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          // Aggregate orders and preserve nft._id
          const aggregated = {};
          res.data.orders.forEach((order) => {
            if (!order.nft?._id) return;
            const nftId = order.nft._id;
            if (aggregated[nftId]) {
              aggregated[nftId].quantity += order.quantity;
              if (new Date(order.createdAt) > new Date(aggregated[nftId].createdAt)) {
                aggregated[nftId].createdAt = order.createdAt;
              }
              if (order.status === "pending") aggregated[nftId].status = "pending";
            } else {
              aggregated[nftId] = {
                nft: { _id: order.nft._id, ...order.nft },
                quantity: order.quantity,
                status: order.status,
                createdAt: order.createdAt,
              };
            }
          });
          setOrders(Object.values(aggregated));
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const handleRequestModerator = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(buildApiUrl(API_ENDPOINTS.REQUEST_MODERATOR), {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setToast({ open: true, message: res.data.message || "Request sent", type: res.data.success ? "success" : "error" });
    } catch (err) {
      setToast({ open: true, message: err.response?.data?.message || "Error", type: "error" });
    } finally {
      setDialogOpen(false);
    }
  };

  const openResaleDialog = (order) => {
    if (!order.nft?._id) {
      setToast({ open: true, message: "NFT ID not found", type: "error" });
      return;
    }
    if (user.role !== "moderator") {
      setDialogOpen(true);
      return;
    }
    setSelectedOrder(order);
    setResalePrice(order.nft.price);
    setResaleQuantity(1);
    setResaleDialogOpen(true);
  };

  const handleResale = async () => {
    if (!resalePrice || resalePrice <= 0) {
      setToast({ open: true, message: "Invalid price.", type: "error" });
      return;
    }
    if (!resaleQuantity || resaleQuantity <= 0 || resaleQuantity > selectedOrder.quantity) {
      setToast({ open: true, message: "Invalid quantity.", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        buildApiUrl(API_ENDPOINTS.NFT_RESELL.replace(":nftId", selectedOrder.nft._id)),
        {
          nftId: selectedOrder.nft._id,
          price: Number(resalePrice),
          quantity: Number(resaleQuantity),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev
            .map((o) =>
              o.nft && o.nft._id === selectedOrder.nft._id
                ? { ...o, quantity: o.quantity - Number(resaleQuantity) }
                : o
            )
            .filter((o) => o.quantity > 0)
        );
        setToast({ open: true, message: "NFT listed for resale!", type: "success" });
        setResaleDialogOpen(false);
      } else {
        setToast({ open: true, message: res.data.message || "Failed to list NFT.", type: "error" });
      }
    } catch (error) {
      setToast({ open: true, message: error.response?.data?.message || "Error listing NFT", type: "error" });
    }
  };

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", py: 6, px: 3 }}>
      <Paper elevation={3} sx={{ maxWidth: 1100, mx: "auto", p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          My Purchases
        </Typography>

        <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
          Once your order is <b>confirmed</b>, you can put it back on sale.
        </Typography>

        {orders.length === 0 ? (
          <Typography color="text.secondary" textAlign="center">You haven’t bought any NFTs yet.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
                <TableRow>
                  <TableCell><b>Image</b></TableCell>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Quantity</b></TableCell>
                  <TableCell><b>Price</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) =>
                  order.nft ? (
                    <TableRow key={order.nft._id} hover>
                      <TableCell>
                        <Avatar
                          variant="rounded"
                          src={order.nft.image ? buildApiUrl(`/uploads/${order.nft.image}`) : "https://via.placeholder.com/80"}
                          alt={order.nft.name}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>{order.nft.name}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>${order.nft.price}</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {order.status === "confirmed" ? (
                          <Chip label="Confirmed" color="success" size="small" />
                        ) : order.status === "pending" ? (
                          <Chip label="Pending" color="warning" size="small" />
                        ) : (
                          <Chip label={order.status} color="default" size="small" />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.status === "confirmed" ? (
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => openResaleDialog(order)}
                          >
                            Put on Sale
                          </Button>
                        ) : (
                          <Typography variant="body2" color="text.secondary">Pending</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Non-moderator dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Resale Not Allowed</DialogTitle>
        <DialogContent>
          <Typography mb={2}>Become a moderator to resale your NFTs.</Typography>
          <Button variant="contained" color="primary" onClick={handleRequestModerator}>Request Moderator</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Resale dialog */}
      <Dialog open={resaleDialogOpen} onClose={() => setResaleDialogOpen(false)}>
        <DialogTitle>Put NFT on Sale</DialogTitle>
        <DialogContent>
          <TextField
            label="Resale Price"
            type="number"
            fullWidth
            value={resalePrice}
            onChange={(e) => setResalePrice(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={resaleQuantity}
            onChange={(e) => setResaleQuantity(e.target.value)}
            inputProps={{ min: 1, max: selectedOrder?.quantity || 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResaleDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleResale} variant="contained" color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.type}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Purchases;
