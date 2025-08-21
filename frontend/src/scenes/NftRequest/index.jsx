import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";

const PendingNFTsAdmin = () => {
  const [pendingNFTs, setPendingNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Pending NFTs
  const fetchPendingNFTs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(buildApiUrl(API_ENDPOINTS.GET_ALL_NFTS), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const onlyPending = res.data.nfts.filter(
          (nft) => nft.status === "pending"
        );
        setPendingNFTs(onlyPending);
      } else {
        toast.error("Failed to load NFTs");
      }
    } catch (err) {
      toast.error("Server error while fetching NFTs");
    } finally {
      setLoading(false);
    }
  };

  // Update NFT status
const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    // replace :id in endpoint
    const url = API_ENDPOINTS.UPDATE_NFT_STATUS.replace(":id", id);

    const res = await axios.put(
      buildApiUrl(url),
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      toast.success(`NFT ${status} successfully`);
      fetchPendingNFTs(); // refresh
    } else {
      toast.error(res.data.error || "Failed to update");
    }
  } catch (err) {
    toast.error("Server error while updating status");
  }
};



  useEffect(() => {
    fetchPendingNFTs();
  }, []);

  return (
    <Box p={4}>
      <ToastContainer />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Pending NFTs
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review and update the status of NFTs submitted by users.
      </Typography>

      {loading ? (
        <Box className="flex justify-center p-6">
          <CircularProgress />
        </Box>
      ) : pendingNFTs.length === 0 ? (
        <Typography color="text.secondary" mt={4} align="center">
          No pending NFTs found.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>Image</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingNFTs.map((nft) => (
                <TableRow key={nft._id}>
                  <TableCell>
                    <img
                      src={`http://localhost:5001/uploads/${nft.image}`}
                      alt={nft.name}
                      style={{ width: 70, height: 70, borderRadius: 8 }}
                    />
                  </TableCell>
                  <TableCell>{nft.name}</TableCell>
                  <TableCell>{nft.price} ETH</TableCell>
                  <TableCell>{nft.description}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => updateStatus(nft._id, "available")}
                      >
                       approve
                      </Button>
                     
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PendingNFTsAdmin;
