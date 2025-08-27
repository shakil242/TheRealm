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
  Typography,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl } from "../../config/api";

const AllNFTsAdmin = () => {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNFTs = async () => {
    setLoading(true);
    try {
      
      const res = await axios.get(buildApiUrl("/api/nfts/all"), {
        withCredentials:true
      });

      if (res.data.success) {
        setNFTs(res.data.nfts);
      } else {
        toast.error(res.data.error || "Failed to load NFTs");
      }
    } catch (err) {
      toast.error("Server error while fetching NFTs");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
     
      const res = await axios.put(
        buildApiUrl(`/api/nfts/${id}/status`),
        { status },
        {withCredentials:true}
      );

      if (res.data.success) {
        toast.success(`NFT status updated to "${status}"`);
        fetchNFTs(); // refresh list
      } else {
        toast.error(res.data.error || "Failed to update");
      }
    } catch (err) {
      toast.error("Server error while updating status");
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <Box  p={4}>
      <ToastContainer />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        All NFTs
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Review all NFTs submitted by users.
      </Typography>

      {loading ? (
        <Box className="flex justify-center p-6">
          <CircularProgress />
        </Box>
      ) : nfts.length === 0 ? (
        <Typography color="text.secondary" mt={4} align="center">
          No NFTs found.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>Image</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Creator</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nfts.map((nft) => (
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
                  <TableCell>
                    <Select
                      value={nft.status}
                      onChange={(e) => updateStatus(nft._id, e.target.value)}
                      size="small"
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="available">Approved</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{nft.creator?.username || "Unknown"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AllNFTsAdmin;
